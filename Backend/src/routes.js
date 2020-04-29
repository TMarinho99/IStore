import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ClientController from './app/controllers/ClientController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users/:id', UserController.update);

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

export default routes;
