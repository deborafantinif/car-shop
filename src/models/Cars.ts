import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
});

class CarsModels extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Frame', carsMongooseSchema)) {
    super(model);
  }
}

export default CarsModels;