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

  async readOne(req: Request, res: Response) {
    const cars = await this._service.readOne(req.params.id);
    res.json(cars);
  }

  async update(req: Request, res: Response) {
    const updateCar = await this._service.update(req.params.id, req.body);
    res.json(updateCar);
  }

  async delete(req: Request, res: Response) {
    const deleteCar = await this._service.delete(req.params.id);
    res.status(204).json(deleteCar);
  }
}

export default CarsController;