import { ErrorTypes } from '../errors/catalog';
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
  
  async readOne(_id: string): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.HexadecimalLength);
    const car = await this._cars.readOne(_id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updatedCar = await this._cars.update(_id, parsed.data);
    if (!updatedCar) throw new Error(ErrorTypes.ObjectNotFound);

    return updatedCar;
  }

  async delete(_id: string): Promise<ICar | null> {
    const deleteCar = await this._cars.delete(_id);
    console.log(deleteCar);
    if (!deleteCar) throw new Error(ErrorTypes.ObjectNotFound);
    return null;
  }
}

export default CarsService;