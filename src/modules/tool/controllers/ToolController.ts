import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import { ICreateToolDTO } from '../dto/ICreateToolDTO';
import CreateToolService from '../services/CreateToolService';
import DeleteToolService from '../services/DeleteToolService';

export default class ToolController
  extends BaseController
  implements IControllers {
  public async store(request: Request, response: Response): Promise<Response> {
    const toolData: ICreateToolDTO = request.body;

    const createToolService = container.resolve(CreateToolService);

    const newUser = await createToolService.execute(toolData);

    return super.getResponse(
      request,
      response.status(HTTPStatusCodeEnum.CREATED).json(newUser),
    );
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteToolService = container.resolve(DeleteToolService);

    await deleteToolService.execute(Number(id));

    return super.getResponse(
      request,
      response.status(HTTPStatusCodeEnum.SUCCESS_NO_CONTENT).send(),
    );
  }
}
