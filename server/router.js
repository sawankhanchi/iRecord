import express, { Router } from 'express';

import { index } from './controllers/records';

const router = Router();

router.route('/records.json').get(index);

export default router;