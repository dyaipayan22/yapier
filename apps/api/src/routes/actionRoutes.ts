import { Router } from 'express';
import { getAvailableActions } from '../controllers/actionController';

const router: Router = Router();

router.get('/available', getAvailableActions);

export default router;
