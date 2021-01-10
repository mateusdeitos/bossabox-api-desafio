import { TOOL_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { inject, injectable } from 'tsyringe';
import { ICreateToolDTO } from '@modules/tool/dto/ICreateToolDTO';

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

  private removeDuplicatedTags(tags: string[]): string[] {
    return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())));
  }

  public async execute(tool: ICreateToolDTO): Promise<Tool> {
    await this.validateTool(tool);
    if (tool.tags && tool.tags.length > 0) {
      const validTags = this.removeDuplicatedTags(tool.tags);
      Object.assign(tool, { tags: validTags.join(',') });
    }

    return this.toolRepository.create(tool);
  }
}
