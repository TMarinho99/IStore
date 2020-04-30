import Sequelize, { Model } from 'sequelize';

class Movement extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                value: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        return this.belongsTo(models.Cashier, {
            foreignKey: 'cashier_id',
            as: 'cashier',
        });
    }
}

export default Movement;
