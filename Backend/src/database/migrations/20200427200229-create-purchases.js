module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('purchases', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            price_total: {
                type: Sequelize.INTEGER,
                allowNul: false,
            },
            amount: {
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
        return queryInterface.dropTable('purchases');
    },
};
