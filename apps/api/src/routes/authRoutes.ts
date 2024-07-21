import { Router } from 'express';
import { signIn, signOut } from '../interactors/authInteractor';
import { refreshAccessToken } from '../controllers/authController';

const router: Router = Router();

router.post('/signIn', signIn);
router.get('/refresh', refreshAccessToken);
router.post('/signOut', signOut);

export default router;
