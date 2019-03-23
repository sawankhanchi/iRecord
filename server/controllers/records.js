import Record from '../models/record';

export const index = (req, res, next) => {
    Record.find().lean().exec((err, records) => res.json(
        {records: records.map(record => ({
            ...record
            // TODO add more functionality here later
        }))}
    ))
}

export const create = (req, res, next) => {
    let record = new Record({
        artist: req.body.artist,
        cover: req.body.cover
    });

    debugger;

    record.save(function(err) {
        if (err) {
            return next(err);
        }

        res.send('record saved successfully');
    })
}