// import * as Yup from 'yup';
import * as Yup from 'yup';
import Product from '../models/Product';
import Purchase from '../models/Purchase';
import PurchaseProduct from '../models/PurchaseProduct';
import Movement from '../models/Movement';
import Cashier from '../models/Cashier';

class PurchaseProductController {
    async index(req, res) {
        const schema = Yup.object().shape({
            purchaseId: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const existPurchase = await Purchase.findByPk(req.params.purchaseId);

        if (!existPurchase) {
            return res.status(400).json({ error: 'Purchase not found' });
        }

        const purchaseProduct = await PurchaseProduct.findAll({
            where: { purchase_id: req.params.purchaseId },
            attributes: ['id', 'price', 'amount'],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [
                        'name',
                        'price',
                        'description',
                        'size',
                        'amount',
                    ],
                },
            ],
        });

        return res.json(purchaseProduct);
    }

    async store(req, res) {
        req.body.product_id = req.params.productId;
        req.body.purchase_id = req.params.purchaseId;

        const schema = Yup.object().shape({
            amount: Yup.number().required(),
            price: Yup.number().required(),
            product_id: Yup.number().required(),
            purchase_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const existProduct = await Product.findByPk(req.params.productId);

        if (!existProduct) {
            return res.status(400).json({ error: 'Product not found' });
        }

        const existPurchase = await Purchase.findByPk(req.params.purchaseId);

        if (!existPurchase) {
            return res.status(400).json({ error: 'Purchase not found' });
        }

        const { id, amount, price } = await PurchaseProduct.create(req.body);

        existProduct.amount += req.body.amount;
        await existProduct.save();

        existPurchase.amount += 1;
        existPurchase.price_total += req.body.price * req.body.amount;
        await existPurchase.save();

        const existCashier = await Cashier.findByPk(1);

        if (!existCashier) {
            return res.status(400).json({ error: 'Cashier not create' });
        }

        const date = new Date();
        const value = -(req.body.price * req.body.amount);
        await Movement.create({
            date,
            value,
            cashier_id: 1,
        });

        existCashier.balance += value;
        await existCashier.save();

        return res.json({
            id,
            product_id: req.body.product_id,
            purchase_id: req.body.purchase_id,
            amount,
            price,
        });
    }
}

export default new PurchaseProductController();
