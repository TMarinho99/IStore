import Sequelize, { Model } from 'sequelize';

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.INTEGER,
                description: Sequelize.STRING,
                size: Sequelize.STRING,
                amount: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
    }
}

export default Product;
