import Sale from '../models/Sale';

class FinalizeSale {
    async store(req, res) {
        const existSale = await Sale.findByPk(req.params.id);

        if (!existSale) {
            return res.status(400).json({ error: 'Sale not found' });
        }

        if (existSale.status !== 'PENDENTE') {
            return res.status(400).json({ error: 'Sale not PENDENTE' });
        }

        existSale.status = 'FINALIZADA';
        await existSale.save();

        return res.status(204).send();
    }
}

export default new FinalizeSale();
