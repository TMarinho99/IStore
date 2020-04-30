import Sequelize, { Model } from 'sequelize';

class Cashier extends Model {
    static init(sequelize) {
        super.init(
            {
                balance: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: 'cashier',
            }
        );
        return this;
    }
}

export default Cashier;
