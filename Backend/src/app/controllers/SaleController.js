import * as Yup from 'yup';
import Sale from '../models/Sale';
import Client from '../models/Client';

class SaleController {
    async index(req, res) {
        const response = await Sale.findAll({
            attributes: [
                'id',
                'date',
                'note',
                'status',
                'value_sale',
                'installments',
            ],
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'name', 'address', 'whatsapp'],
                },
            ],
        });

        return res.json(response);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            note: Yup.string(),
            status: Yup.string().required(),
            value_sale: Yup.number().required(),
            client_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const existClient = await Client.findByPk(req.body.client_id);

        if (!existClient) {
            return res.status(400).json({ error: 'Client not found ' });
        }

        const {
            id,
            date,
            note,
            status,
            value_sale,
            installments,
            client_id,
        } = await Sale.create(req.body);

        return res.json({
            id,
            date,
            note,
            status,
            value_sale,
            installments,
            client_id,
        });
    }
}

export default new SaleController();
