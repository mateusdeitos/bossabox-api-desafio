import { ICreateToolDTO } from '@modules/tool/dto/ICreateToolDTO';
import Tool from '@modules/tool/entities/typeorm/Tool';
import {
  saveObjectInRepository,
  findEntityInRepositoryByProp,
  removeObjectInRepository,
} from '@shared/utils/testUtils';
import { IToolRepository } from '../dto/IToolRepository';

export default class FakeToolRepository implements IToolRepository {
  private ormRepository: Tool[];

  constructor() {
    this.ormRepository = [];
  }

  public async create(tool: Tool): Promise<Tool> {
    const newTool = {
      ...new Tool(),
      ...tool,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return saveObjectInRepository(this.ormRepository, newTool);
  }

  public async delete(id: number): Promise<void> {
    removeObjectInRepository(this.ormRepository, id);
  }

  public async findByProp(
    prop: keyof Tool,
    value: Tool[keyof Tool],
  ): Promise<Tool | undefined> {
    return findEntityInRepositoryByProp(this.ormRepository, {
      propName: prop,
      propValue: value,
    });
  }
}
