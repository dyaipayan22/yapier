import { Router } from 'express';
import { registerUser } from '../interactors/userInteractor';

const router: Router = Router();

router.post('/create', registerUser);

export default router;
