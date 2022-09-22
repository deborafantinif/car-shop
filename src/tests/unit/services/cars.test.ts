import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';
import CarsModels from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carsMock, carsMockWithId, listCarsMock } from '../mocks/carsMock';

describe('Cars Service', () => {
	const carsModel = new CarsModels();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carsMockWithId);
		sinon.stub(carsModel, 'read').resolves(listCarsMock);
		sinon.stub(carsModel, 'readOne')
			.onCall(0).resolves(carsMockWithId) 
			.onCall(1).resolves(null); 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carsService.create(carsMock);

			expect(carCreated).to.be.deep.equal(carsMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await carsService.create({} as ICar);
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
	});

  describe('Read Car', () => {
		it('Success', async () => {
			const cars = await carsService.read();

			expect(cars).to.be.deep.equal(listCarsMock);
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carOne = await carsService.readOne('carsMockWithId._id');

			expect(carOne).to.be.deep.equal(carsMockWithId);
		});

		it('Failure', async () => {
      let error: any;
			try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carsService.readOne('frameMockWithId._id');
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});
});