import { Router } from 'express';
import { getAvailableTriggers } from '../controllers/triggerController';

const router: Router = Router();

router.get('/available', getAvailableTriggers);

export default router;
