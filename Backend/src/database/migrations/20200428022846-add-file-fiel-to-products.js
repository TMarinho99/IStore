module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('products', 'file_id', {
            type: Sequelize.INTEGER,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('products', 'file_id');
    },
};
