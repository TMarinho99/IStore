import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ClientController from './app/controllers/ClientController';
import ProductController from './app/controllers/ProductController';
import PurchaseController from './app/controllers/PurchaseController';
import PurchaseProductController from './app/controllers/PurchaseProductController';
import CashierController from './app/controllers/CashierController';
import MovementController from './app/controllers/MovementController';
import SaleController from './app/controllers/SaleController';
import SaleProductController from './app/controllers/SaleProductController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);

routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/purchases', PurchaseController.store);
routes.get('/purchases', PurchaseController.index);

routes.post(
    '/purchases/:purchaseId/products/:productId',
    PurchaseProductController.store
);
routes.get('/purchases/:purchaseId/products', PurchaseProductController.index);

routes.post('/cashier', CashierController.store);
routes.get('/cashier', CashierController.show);

routes.post('/cashier/movements', MovementController.store);
routes.get('/cashier/movements', MovementController.index);

routes.post('/sales', SaleController.store);
routes.get('/sales', SaleController.index);

routes.post('/sales/:saleId/products/:productId', SaleProductController.store);

export default routes;
