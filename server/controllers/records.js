import Record from '../models/record';

export const index = (req, res, next) => {
    Record.find().lean().exec((err, records) => res.json(
        {records: records.map(record => ({
            ...record
            // TODO add more functionality here later
        }))}
    ))
}