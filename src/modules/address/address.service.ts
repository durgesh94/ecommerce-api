import { CreateAddressDto } from './address.dto';
import { AddressRepository } from './address.repository';
import { Address } from './address.entity';
import { User } from '../user/user.entity';

export class AddressService {
  private addressRepository: AddressRepository = new AddressRepository();

  constructor(addressRepository: AddressRepository) {
    this.addressRepository = addressRepository;
  }

  createAddress = async (addressDto: CreateAddressDto): Promise<Address> => {
    const address: Address = new Address();
    // Hardcoded user ID for now, replace with actual user ID from context or request
    const userId = "85adb694-3740-41a8-8c28-885496ef19ef";

    address.user = { id: userId } as User;
    address.addressLine1 = addressDto.addressLine1;
    address.addressLine2 = addressDto.addressLine2 ?? null;
    address.city = addressDto.city;
    address.state = addressDto.state;
    address.postalCode = addressDto.postalCode;
    address.country = addressDto.country;
    address.isDefault = addressDto.isDefault;
    address.type = addressDto.type;

    const savedAddress: Address = await this.addressRepository.createAddress(address);
    return savedAddress;
  };

  getAddressById = async (id: string): Promise<Address | null> => {
    const address: Address | null = await this.addressRepository.findAddressById(id);
    return address;
  };
}
