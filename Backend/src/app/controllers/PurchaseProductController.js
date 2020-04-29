// import * as Yup from 'yup';
import Product from '../models/Product';
import Parchase from '../models/Purchase';
import PurchaseProduct from '../models/PurchaseProduct';

class PurchaseProductController {
    async store(req, res) {
        req.body.product_id = req.params.productId;
        req.body.purchase_id = req.params.purchaseId;
        const existProduct = await Product.findByPk(req.params.productId);

        if (!existProduct) {
            return res.status(400).json({ error: 'Product not found' });
        }

        const existPurchase = await Parchase.findByPk(req.params.purchaseId);

        if (!existPurchase) {
            return res.status(400).json({ error: 'Parchase not found' });
        }

        const { id, amount, price } = await PurchaseProduct.create(req.body);

        existProduct.amount += req.body.amount;
        await existProduct.save();

        existPurchase.amount += 1;
        existPurchase.price_total += req.body.price * req.body.amount;
        await existPurchase.save();

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
