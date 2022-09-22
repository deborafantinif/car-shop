import { ICar } from '../../../interfaces/ICar';

const carsMock: ICar = {
  model: 'new',
  year: 2003,
  color: 'blue',
  buyValue: 21,
  doorsQty: 4,
  seatsQty: 5,
}

const carsMockWithId: ICar & { _id:number } = {
  _id: 3,
  model: 'new',
  year: 2003,
  color: 'blue',
  buyValue: 21,
  doorsQty: 4,
  seatsQty: 5,
}

const listCarsMock: ICar[] = [{
  model: 'new',
  year: 2003,
  color: 'blue',
  buyValue: 21,
  doorsQty: 4,
  seatsQty: 5,
}]

export { carsMock, carsMockWithId, listCarsMock };
