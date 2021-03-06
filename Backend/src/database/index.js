import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Client from '../app/models/Client';
import File from '../app/models/File';
import Product from '../app/models/Product';
import Purchase from '../app/models/Purchase';
import PurchaseProduct from '../app/models/PurchaseProduct';
import Cashier from '../app/models/Cashier';
import Movement from '../app/models/Movement';
import Sale from '../app/models/Sale';
import SaleProduct from '../app/models/SaleProduct';
import Category from '../app/models/Category';

const models = [
    User,
    Client,
    File,
    Product,
    Purchase,
    PurchaseProduct,
    Cashier,
    Movement,
    Sale,
    SaleProduct,
    Category,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
