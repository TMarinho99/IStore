import * as Yup from 'yup';
import { Op } from 'sequelize';
import SaleProduct from '../models/SaleProduct';
import Sale from '../models/Sale';
import Product from '../models/Product';
import Movement from '../models/Movement';
import Cashier from '../models/Cashier';

class SaleProductController {
    async store(req, res) {
        req.body.sale_id = req.params.saleId;
        req.body.product_id = req.params.productId;

        const schema = Yup.object().shape({
            note: Yup.string(),
            amount: Yup.number().required(),
            price_product: Yup.number().required(),
            product_id: Yup.number().required(),
            sale_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const existSale = await Sale.findByPk(req.params.saleId);

        if (!existSale) {
            return res.status(400).json({ error: 'Sale not found' });
        }

        const existProduct = await Product.findOne({
            where: {
                id: req.params.productId,
                amount: {
                    [Op.gte]: req.body.amount,
                },
            },
        });

        if (!existProduct) {
            return res
                .status(400)
                .json({ error: 'Product amount not in stock' });
        }

        const { id, note, amount, price_product } = await SaleProduct.create(
            req.body
        );

        existProduct.amount -= req.body.amount;
        await existProduct.save();

        existSale.value_sale += req.body.amount * req.body.price_product;
        await existSale.save();

        const existCashier = await Cashier.findByPk(1);

        if (!existCashier) {
            return res.status(400).json({ error: 'Cashier not create' });
        }

        const date = new Date();
        const value = req.body.amount * req.body.price_product;
        await Movement.create({
            date,
            value,
            description: 'ENTRADA',
            cashier_id: 1,
        });

        existCashier.balance += value;
        await existCashier.save();

        return res.json({
            id,
            note,
            amount,
            price_product,
            product_id: req.body.product_id,
            sale_id: req.body.sale_id,
        });
    }
}

export default new SaleProductController();
