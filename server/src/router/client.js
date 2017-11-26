
import express from 'express';
import {
  loginFunc
} from '../controller/user.js';
var router = express.Router();

router.post('/login', loginFunc);

export default router;
