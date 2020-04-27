import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
            whatsapp: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status().json({ error: 'validation failed' });
        }

        const existUser = await User.findOne({
            where: { email: req.body.email },
        });

        if (existUser) {
            return res.status(400).json({ error: 'User already registered' });
        }

        const [id, name, email, whatsapp] = await User.create(req.body);

        req.user_id = id;

        return res.json({
            id,
            name,
            email,
            whatsapp,
        });
    }

    async update(req, res) {
        req.body.id = req.params.id;
        const schema = Yup.object().shape({
            id: Yup.number(),
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmePassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, oldPassword } = req.boby;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExist = await User.findOne({ where: { email } });

            if (userExist) {
                return res.status(400).json({ error: 'User already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(400).json({ error: 'Password does not match' });
        }

        const { id, name, whatsapp } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            whatsapp,
        });
    }
}

export default new UserController();
