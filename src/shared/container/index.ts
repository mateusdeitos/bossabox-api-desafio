import { container } from 'tsyringe';
import '../providers';
import { IUserRepository } from '@modules/user/repositories/dto/IUserRepository';
import UserRepository from '@modules/user/repositories/typeorm/UserRepository';
import { IToolRepository } from '@modules/tool/repositories/dto/IToolRepository';
import ToolRepository from '@modules/tool/repositories/typeorm/ToolRepository';

export const USER_REPOSITORY_TOKEN = 'UserRepository';
container.registerSingleton<IUserRepository>(
  USER_REPOSITORY_TOKEN,
  UserRepository,
);
export const TOOL_REPOSITORY_TOKEN = 'ToolRepository';
container.registerSingleton<IToolRepository>(
  TOOL_REPOSITORY_TOKEN,
  ToolRepository,
);
