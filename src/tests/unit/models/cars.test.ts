// ./src/tests/unit/models/frame.test.ts

import { expect } from 'chai';
import sinon from 'sinon';
import CarsModels from '../../../models/Cars';
import { Model } from 'mongoose';
import { carsMock, carsMockWithId, listCarsMock } from '../mocks/carsMock';

describe('Cars Model', () => {
  const carsModel = new CarsModels();

	before(() => {
		sinon.stub(Model, 'create').resolves(carsMockWithId);
		sinon.stub(Model, 'find').resolves(listCarsMock);
		sinon.stub(Model, 'findOne').resolves(carsMockWithId);
	});

	after(() => {
		sinon.restore();
	});

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carsModel.create(carsMock);
			expect(newCar).to.be.deep.equal(carsMockWithId);
		});
	});

	describe('get all cars', () => {
		it('successfully found', async () => {
			const cars = await carsModel.read();
			expect(cars).to.be.deep.equal(listCarsMock);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carsModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carFound).to.be.deep.equal(carsMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carsModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('ObjectNotFound');
			}
		});
	});

});