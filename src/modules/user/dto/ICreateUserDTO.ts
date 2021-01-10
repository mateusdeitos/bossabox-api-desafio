import User from '../entities/typeorm/User';

export type ICreateUserDTO = Pick<User, 'name' | 'email' | 'password'>;
