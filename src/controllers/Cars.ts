import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarsController {
  constructor(private _service:IService<ICar>) {}

  async create(req: Request, res: Response) {
    const newCar = await this._service.create(req.body);
    res.status(201).json(newCar);
  }

  async read(_req: Request, res: Response) {
    const cars = await this._service.read();
    res.json(cars);
  }
}

export default CarsController;