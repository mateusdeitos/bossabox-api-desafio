import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import { ICreateToolDTO } from '../dto/ICreateToolDTO';
import CreateToolService from '../services/CreateToolService';

export default class ToolController
  extends BaseController
  implements IControllers {
  public async store(request: Request, response: Response): Promise<Response> {
    const toolData: ICreateToolDTO = request.body;

    const createToolService = container.resolve(CreateToolService);

    const newUser = await createToolService.execute(toolData);

    return super.getResponse(
      request,
      response.status(HTTPStatusCodeEnum.SUCCESS).json(newUser),
    );
  }
}
