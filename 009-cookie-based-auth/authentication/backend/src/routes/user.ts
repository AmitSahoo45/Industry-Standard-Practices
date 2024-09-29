import { Router } from 'express';
import { OTPLogin } from '../controller/user'

const router = Router();

router.post('/register', OTPLogin);

export default router;