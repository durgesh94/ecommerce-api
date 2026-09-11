import { ApiResponse } from '../../common/utils/api-response';
import { asyncHandler } from '../../common/utils/async-handler';
import { CreateAddressDto } from './address.dto';
import { AddressService } from './address.service';

export class AddressController {
  private readonly service: AddressService;

  constructor(service: AddressService) {
    this.service = service;
  }

  createAddress = asyncHandler(async (req, res) => {
    console.log('Request body:', req.body);
    const address: CreateAddressDto = req.body;
    const savedAddress = await this.service.createAddress(address);
    ApiResponse.success(res, savedAddress, 'Address created successfully');
  });

  getAddressById = asyncHandler(async (req, res) => {
    const addressId = req.params.id;
    const address = await this.service.getAddressById(addressId);
    ApiResponse.success(res, address, 'Address retrieved successfully');
  });
}
