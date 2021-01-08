import { celebrate } from 'celebrate';
import { Router } from 'express';
import ToolController from '../controllers/ToolController';
import { ToolValidationSchema } from './validations/ToolValidations';
import checkAuthentication from '../../../shared/routes/middlewares/checkAuthentication';

const toolRouter = Router();
const toolController = new ToolController();
toolRouter.use(checkAuthentication);
toolRouter.post(
  '/',
  celebrate(
    {
      body: ToolValidationSchema.store,
    },
    { abortEarly: false },
  ),
  toolController.store,
);

export default toolRouter;
