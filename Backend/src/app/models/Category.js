import Sequelize, { Model } from 'sequelize';

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'category',
            }
        );
        return this;
    }
}

export default Category;
