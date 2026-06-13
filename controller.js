const model = require('./model');

class Controller {
    static async create(req, res) {
        try {
            const data = req.body;
            const result = await model.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async cut(req, res) {
        try {
            const requestedMeters = Number(req.body.meters);

            const result = await model.cut(requestedMeters);

            res.status(200).json(result);
        } catch (err) {
            if (err.message === "NO_RIBBON") {
                return res.status(400).json({ error: "No ribbon" });
            }
            if (err.message === "NOT_INITIALIZED") {
                return res.status(404).json({ error: "Ribbon stock has not been created yet" });
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async incrementPrice(req, res) {
        try {
            const amount = Number(req.query.amount);

            const result = await model.incrementPrice(amount);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async decrementPrice(req, res) {
        try {
            const amount = Number(req.query.amount);

            const result = await model.decrementPrice(amount);
            res.status(200).json(result);
        } catch (err) {
            if (err.message === "PRICE_TOO_LOW") {
                return res.status(400).json({ error: "Price cannot be negative" });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async getTotalPrice(req, res) {
        try {
            const result = await model.getTotalPrice();
            return res.status(200).json(result);
        } catch (err) {
            if (err.message === "NOT_INITIALIZED") {
                return res.status(404).json({ error: "Ribbon stock has not been created yet" });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
module.exports = Controller;