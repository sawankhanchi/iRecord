import express, { Router } from 'express';

import { index, create } from './controllers/records';

const router = Router();

router.route('/records.json').get(index);

router.post('/create', create);

export default router;