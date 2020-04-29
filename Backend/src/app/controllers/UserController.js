import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            whatsapp: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) {
            return res.status(400).json({ eror: 'Usuario ja existe' });
        }

        const { id, name, email, whatsapp } = await User.create(req.body);

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
            avatar_id: Yup.number(),
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

        const { email, oldPassword, avatar_id } = req.body;

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
            avatar_id,
        });
    }

    async show(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const existUser = await User.findByPk(req.params.id);

        if (!existUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        return res.json(existUser);
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const existUser = await User.findByPk(req.params.id);

        if (!existUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        await existUser.destroy();

        return res.status(204).send();
    }
}

export default new UserController();
