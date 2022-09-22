import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { ICar } from '../../../interfaces/ICar';
import CarsModels from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carsMock, carsMockWithId, listCarsMock } from '../mocks/carsMock';
import CarsController from '../../../controllers/Cars';


describe('Cars Controller', () => {
	const carsModel = new CarsModels();
	const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carsMockWithId);
    sinon.stub(carsService, 'read').resolves(listCarsMock);
    sinon.stub(carsService, 'readOne').resolves(carsMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carsMock;
      await carsController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('Read Cars', () => {
    it('Success', async () => {
      await carsController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(listCarsMock)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: 'carsMockWithId._id' };
      await carsController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    });
  });
});