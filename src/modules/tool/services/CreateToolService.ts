import { TOOL_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { inject, injectable } from 'tsyringe';
import {
  ICreateToolDTO,
  IResponseToolCreatedDTO,
} from '@modules/tool/dto/ICreateToolDTO';

import Tool from '../entities/typeorm/Tool';
import { IToolRepository } from '../repositories/dto/IToolRepository';

@injectable()
export default class CreateToolService {
  constructor(
    @inject(TOOL_REPOSITORY_TOKEN)
    private toolRepository: IToolRepository,
  ) {}

  private async validateTool(tool: ICreateToolDTO): Promise<void> {
    const { title } = tool;
    const existeTool = await this.toolRepository.findByProp('title', title);
    if (existeTool) {
      throw new ServiceValidationException(
        'Já existe uma ferramenta com esse título',
        'CONFLICT',
        [{ field: 'title', value: title }],
      );
    }
  }

  private removeDuplicatedTags(tags?: string[]): string[] {
    if (!tags) return [];
    return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())));
  }

  public async execute(tool: ICreateToolDTO): Promise<IResponseToolCreatedDTO> {
    await this.validateTool(tool);
    const tags = this.removeDuplicatedTags(tool.tags);

    const newTool = await this.toolRepository.create({
      ...new Tool(),
      ...tool,
      tags: tags.join(','),
    });

    return { ...newTool, tags };
  }
}
