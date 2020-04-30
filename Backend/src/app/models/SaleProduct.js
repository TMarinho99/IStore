import Sequelize, { Model } from 'sequelize';

class SaleProduct extends Model {
    static init(sequelize) {
        super.init(
            {
                note: Sequelize.STRING,
                amount: Sequelize.INTEGER,
                price_product: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
        });

        this.belongsTo(models.Sale, {
            foreignKey: 'sale_id',
            as: 'sale',
        });
    }
}

export default SaleProduct;
