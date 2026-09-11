import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './address.dto';
import { AppDataSource } from '../../config/database';

export class AddressRepository {
  private readonly addressRepository: Repository<Address>;

  constructor(addressRepository: Repository<Address> = AppDataSource.getRepository(Address)) {
    this.addressRepository = addressRepository;
  }

  createAddress = async (address: CreateAddressDto): Promise<Address> => {
    return this.addressRepository.save(address);
  };

  findAddressById = async (id: string): Promise<Address | null> => {
    return this.addressRepository.findOne({ where: { id } });
  };

  updateAddress = async (id: string, address: Partial<Address>): Promise<void> => {
    await this.addressRepository.update(id, address);
  };

  deleteAddress = async (id: string): Promise<void> => {
    await this.addressRepository.delete(id);
  };

  findDefaultByUserId = async (userId: string): Promise<Address | null> => {
    return this.addressRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        isDefault: true,
      },
    });
  };

  findAllByUserId = async (userId: string): Promise<Address[]> => {
    return this.addressRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  };

  findByIdAndUserId = async (id: string, userId: string): Promise<Address | null> => {
    return this.addressRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  };
}
