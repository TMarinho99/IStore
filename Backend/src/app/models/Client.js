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
}

export default Client;
