import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                note: Sequelize.STRING,
                status: Sequelize.ENUM('PENDENTE', 'FINALIZADA'),
                value_sale: Sequelize.INTEGER,
                installments: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        return this.belongsTo(models.Client, {
            foreignKey: 'client_id',
            as: 'client',
        });
    }
}

export default Sale;
