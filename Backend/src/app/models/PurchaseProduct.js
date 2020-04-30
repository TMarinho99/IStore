import Sequelize, { Model } from 'sequelize';

class PurchaseProduct extends Model {
    static init(sequelize) {
        super.init(
            {
                price: Sequelize.INTEGER,
                amount: Sequelize.INTEGER,
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

        this.belongsTo(models.Purchase, {
            foreignKey: 'purchase_id',
            as: 'purchase',
        });
    }
}

export default PurchaseProduct;
