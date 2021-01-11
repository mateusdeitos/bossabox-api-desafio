import { TOOL_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { inject, injectable } from 'tsyringe';

import Tool from '../entities/typeorm/Tool';
import { IToolRepository } from '../repositories/dto/IToolRepository';

@injectable()
export default class DeleteToolService {
  constructor(
    @inject(TOOL_REPOSITORY_TOKEN)
    private toolRepository: IToolRepository,
  ) {}

  private async validateTool(tool?: Tool): Promise<void> {
    if (!tool) {
      throw new ServiceValidationException(
        'Ferramenta não encontrada',
        'NOT_FOUND',
      );
    }
  }

  public async execute(id: number): Promise<void> {
    const tool = await this.toolRepository.findByProp('id', id);
    await this.validateTool(tool);

    await this.toolRepository.delete(id);
  }
}
