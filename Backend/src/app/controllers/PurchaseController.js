import * as Yup from 'yup';
import Purchase from '../models/Purchase';

class PurchaseController {
    async index(req, res) {
        const purchase = await Purchase.findAll();

        return res.json(purchase);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            price_total: Yup.number().required(),
            amount: Yup.number().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status().json({ error: 'validation failed' });
        }

        const purchase = await Purchase.create(req.body);

        return res.json(purchase);
    }
}

export default new PurchaseController();
