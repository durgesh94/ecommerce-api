export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string; // Optional, defaults to 'USER'
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;

  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
  }
}
