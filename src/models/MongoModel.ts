import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected _model:Model<T>) {}

  public async read():Promise<T[]> {
    return this._model.find({});
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Not found this');
    return this._model.findOne({ _id });
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async update(_id:string, obj: T):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Not found');
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Not found this');
    return this._model.remove({ _id });
  }
}

export default MongoModel;