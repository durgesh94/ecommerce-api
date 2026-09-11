import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';
import { Router } from 'express';

const addressService = new AddressService(new AddressRepository());
const addressController = new AddressController(addressService);

const addressRouter = Router();

addressRouter.post('/', addressController.createAddress);
addressRouter.get('/:id', addressController.getAddressById);

export default addressRouter;
