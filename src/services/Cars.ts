import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) {}

  async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const newCar = this._cars.create(parsed.data);
    return newCar;
  }
  // read(): Promise<ICar[]> {
  //   throw new Error('Method not implemented.');
  // }
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