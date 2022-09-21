import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) {}

  async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const newCar = await this._cars.create(parsed.data);
    return newCar;
  }

  async read(): Promise<ICar[]> {
    const cars = await this._cars.read();
    return cars;
  }
  // readOne(_id: string): Promise<ICar | null> {
  //   throw new Error('Method not implemented.');
  // }
  // update(_id: string, obj: ICar): Promise<ICar | null> {
  //   throw new Error('Method not implemented.');
  // }
  // delete(_id: string): Promise<ICar | null> {
  //   throw new Error('Method not implemented.');
  // }
}

export default CarsService;