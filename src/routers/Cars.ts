import { Router } from 'express';
import CarsController from '../controllers/Cars';
import CarsModels from '../models/Cars';
import CarsService from '../services/Cars';

const CarsRouter = Router();

const carsModel = new CarsModels();
const carsServices = new CarsService(carsModel);
const carsController = new CarsController(carsServices);

CarsRouter.post('/', (req, res) => carsController.create(req, res));

export default CarsRouter;