import { Router } from 'express';
import {
    // RequestOTP,
    VerifyOTP
} from '../controller/otp'

const router = Router();

// router.post('/request', RequestOTP);
router.post('/verify', VerifyOTP);

export default router;

