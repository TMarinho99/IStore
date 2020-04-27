import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            whatsapp: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status().json({ error: 'validation failed' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password not match' });
        }

        const { id, name, whatsapp } = user;

        return res.json({
            user: {
                id,
                name,
                email,
                whatsapp,
            },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            }),
        });
    }
}

export default new SessionController();
