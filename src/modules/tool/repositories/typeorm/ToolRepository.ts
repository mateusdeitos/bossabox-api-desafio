import Tool from '@modules/tool/entities/typeorm/Tool';
import { getRepository, Repository } from 'typeorm';
import { ICreateToolDTO } from '@modules/tool/dto/ICreateToolDTO';
import { IToolRepository } from '../dto/IToolRepository';

export default class ToolRepository implements IToolRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async create(user: ICreateToolDTO): Promise<Tool> {
    return this.ormRepository.save(user);
  }

  public async findByProp(
    prop: keyof Tool,
    value: Tool[keyof Tool],
  ): Promise<Tool | undefined> {
    return this.ormRepository.findOne({ where: { [prop]: value } });
  }
}
