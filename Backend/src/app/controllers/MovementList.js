import Movement from '../models/Movement';
import Cashier from '../models/Cashier';

class MovementList {
    async index(req, res) {
        const { id } = await Cashier.findByPk(1);
        const response = await Movement.findAll({
            where: {
                cashier_id: id,
                description: req.query.description,
            },
        });

        return res.json(response);
    }
}

export default new MovementList();
