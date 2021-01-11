import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import {
  prepareOrderByArgumentFromQueryParams,
  prepareTagsStringFromQueryParams,
} from '@shared/utils/listResultsUtils';
import { ICreateToolDTO } from '../dto/ICreateToolDTO';
import CreateToolService from '../services/CreateToolService';
import DeleteToolService from '../services/DeleteToolService';
import ListToolsService from '../services/ListToolsService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const { tags, limit, offset, orderBy } = request.query;

    const listToolsService = container.resolve(ListToolsService);

    const listResults = await listToolsService.execute({
      tags: prepareTagsStringFromQueryParams(tags ? String(tags) : ''),
      limit: Number(limit),
      offset: Number(offset),
      orderBy: prepareOrderByArgumentFromQueryParams(
        orderBy ? String(orderBy) : '',
      ),
    });

    return super.getResponse(
      request,
      response.status(HTTPStatusCodeEnum.SUCCESS).json(listResults),
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
