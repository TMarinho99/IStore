import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
    async index(req, res) {
        const response = await Category.findAll();

        return res.json(response);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation failed' });
        }

        const existCategory = await Category.findOne({
            where: { description: req.body.description },
        });

        if (existCategory) {
            return res.status(400).json({ error: 'Category Already Exists' });
        }

        const response = await Category.create(req.body);

        return res.json(response);
    }
}

export default new CategoryController();
