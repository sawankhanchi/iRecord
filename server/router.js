import express, { Router } from 'express';

import { index, create } from './controllers/records';
import Record from '../src/Record';

const router = Router();

router.route('/records.json').get(index);

router.route('/create').post(function (req, res) {
    const record = new Record({
        artist: req.artist,
        cover: req.cover,
    });

    record.save()
        .then(record => {
            res.json('Record saved')
        })
        .catch(err => {
            res.status(400).send('"unable to save record')
        })
})
   
export default router;