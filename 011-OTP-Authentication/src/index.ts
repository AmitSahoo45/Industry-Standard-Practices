import express from 'express'

import userRouter from './routes/user'
import otpRouter from './routes/otp'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => { res.send(`OTP Verification API`) });

app.use(express.json());

app.use('/user', userRouter);
app.use('/otp', otpRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

