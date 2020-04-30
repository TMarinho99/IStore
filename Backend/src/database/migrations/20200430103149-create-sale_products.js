module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sale_products', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            note: {
                type: Sequelize.STRING,
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price_product: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sale_id: {
                type: Sequelize.INTEGER,
                references: { model: 'sales', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: { model: 'products', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('sale_products');
    },
};
