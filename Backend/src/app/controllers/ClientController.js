import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
    async index(req, res) {
        const clients = await Client.findAll();

        return res.json(clients);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            address: Yup.string(),
            whatsapp: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status().json({ error: 'validation failed' });
        }

        const { name } = req.body;

        const client = await Client.findOne({ where: { name } });

        if (client) {
            return res.status(400).json({ error: 'Client already registered' });
        }

        const { id, address, whatsapp } = await Client.create(req.body);

        return res.json({
            id,
            name,
            address,
            whatsapp,
        });
    }

    async show(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(400).json({ error: 'Client not found' });
        }

        return res.json(client);
    }

    async update(req, res) {
        req.body.id = req.params.id;
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            address: Yup.string(),
            whatsapp: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name } = req.body;

        const client = await Client.findByPk(req.params.id);

        if (name !== client.name) {
            const exisClient = await Client.findOne({ where: { name } });

            if (exisClient) {
                return res.status(400).json({ error: 'Client already exists' });
            }
        }

        const { id, address, whatsapp } = await client.update(req.body);

        return res.json({
            id,
            name,
            address,
            whatsapp,
        });
    }
}

export default ClientController;
