import Cashier from '../models/Cashier';

class CashierController {
    async store(req, res) {
        const isCreate = await Cashier.findByPk(1);

        if (isCreate) {
            return res.status(400).json({ error: 'Cashier is Create' });
        }

        const { id, balance } = await Cashier.create({ balance: 0 });

        return res.json({ id, balance });
    }

    async show(req, res) {
        const { balance } = await Cashier.findByPk(1);

        return res.json({ balance });
    }
}

export default new CashierController();
