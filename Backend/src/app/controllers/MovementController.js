import * as Yup from 'yup';
import Movement from '../models/Movement';
import Cashier from '../models/Cashier';

class MovementController {
    async index(req, res) {
        const existCashier = await Cashier.findByPk(1);

        if (!existCashier) {
            return res.status(400).json({ error: 'Cashier not create' });
        }

        const response = await Movement.findAll({
            where: {
                cashier_id: 1,
            },
            attributes: ['id', 'date', 'value'],
            include: [
                {
                    model: Cashier,
                    as: 'cashier',
                    attributes: ['balance'],
                },
            ],
        });

        return res.json(response);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            value: Yup.number().required(),
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const existCashier = await Cashier.findByPk(1);

        if (!existCashier) {
            return res.status(400).json({ error: 'Cashier not create' });
        }

        const date = new Date();
        const { value, description } = req.body;

        const { id } = await Movement.create({
            date,
            value,
            description,
            cashier_id: 1,
        });

        existCashier.balance += value;
        await existCashier.save();

        return res.json({
            id,
            date,
            value,
            description,
        });
    }
}

export default new MovementController();
