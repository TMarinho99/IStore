module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('purchase_products', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNul: false,
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNul: false,
            },
            purchase_id: {
                type: Sequelize.INTEGER,
                references: { model: 'purchases', key: 'id' },
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
        return queryInterface.dropTable('purchase_products');
    },
};
