module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('products', 'category_id', {
            type: Sequelize.INTEGER,
            references: { model: 'category', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('products', 'category_id');
    },
};
