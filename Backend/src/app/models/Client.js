import Sequelize, { Model } from 'sequelize';

class Client extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                address: Sequelize.STRING,
                whatsapp: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default Client;
