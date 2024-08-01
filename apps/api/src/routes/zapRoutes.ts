import { Router } from 'express';
import {
  createZap,
  getAllZaps,
  getZapById,
} from '../controllers/zapController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router: Router = Router();

router.use(authenticateUser);

router.post('/', createZap);
router.get('/', getAllZaps);
router.get('/:zapId', getZapById);

export default router;
