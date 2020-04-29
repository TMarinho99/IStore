import * as Yup from 'yup';
import { Op } from 'sequelize';
import Product from '../models/Product';

class ProductController {
    async index(req, res) {
        const products = await Product.findAll({
            where: {
                amount: {
                    [Op.gt]: 0,
                },
            },
        });

        return res.json(products);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            description: Yup.string(),
            size: Yup.string(),
            amount: Yup.string().required(),
            file_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status().json({ error: 'validation failed' });
        }

        const { name, file_id } = req.body;

        const existProduct = await Product.findOne({ where: { name } });

        if (existProduct) {
            return res
                .status(400)
                .json({ error: 'Product already registered' });
        }

        const { id, price, description, amount, size } = await Product.create(
            req.body
        );

        return res.json({
            id,
            name,
            description,
            price,
            size,
            amount,
            file_id,
        });
    }

    async show(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status().json({ error: 'validation failed' });
        }

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(400).json({ error: 'Product not found' });
        }

        return res.json(product);
    }

    async update(req, res) {
        req.body.id = req.params.id;
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            price: Yup.number(),
            description: Yup.string(),
            size: Yup.string(),
            amount: Yup.string(),
            file_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status().json({ error: 'validation failed' });
        }

        const existProduct = await Product.findByPk(req.params.id);

        if (!existProduct) {
            return res.status(400).json({ error: 'Product not found' });
        }

        const {
            name,
            price,
            description,
            size,
            amount,
            file_id,
        } = await existProduct.update(req.body);

        return res.json({
            name,
            price,
            description,
            size,
            amount,
            file_id,
        });
    }

    async delete(req, res) {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(400).json({ error: 'Product not found' });
        }

        await product.destroy();

        return res.status(204).send();
    }
}

export default new ProductController();
