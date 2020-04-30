import Sale from '../models/Sale';

class SaleProductList {
    async index(req, res) {
        const response = await Sale.findAll({
            where: {
                status: req.query.status,
            },
        });

        return res.json(response);
    }
}

export default new SaleProductList();
