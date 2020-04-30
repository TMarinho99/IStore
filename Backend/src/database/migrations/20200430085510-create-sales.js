module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sales', {
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
            note: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM('PENDENTE', 'FINALIZADA'),
                allowNull: false,
                defaultValue: 'PENDENTE',
            },
            value_sale: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            installments: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            client_id: {
                type: Sequelize.INTEGER,
                references: { model: 'clients', key: 'id' },
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
        return queryInterface.dropTable('sales');
    },
};
