module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cashier', {
            id: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false,
                primaryKey: true,
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNul: false,
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
        return queryInterface.dropTable('cashier');
    },
};
