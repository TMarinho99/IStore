module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('movements', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            cashier_id: {
                type: Sequelize.INTEGER,
                references: { model: 'cashier', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNul: false,
            },
            description: {
                type: Sequelize.ENUM('ENTRADA', 'SAIDA'),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            value: {
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
        return queryInterface.dropTable('movements');
    },
};
