import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                price_total: Sequelize.INTEGER,
                amount: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Purchase;
