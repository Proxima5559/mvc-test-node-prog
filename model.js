const {redis} = require('./config');

class Model {
    static async insert(result) {
        try {
        } catch (err) {
            console.error("Error in insert:", err);
            throw err;
        }
    }

    static async getAll() {
        try {
        } catch (err) {
            console.error("Error in getAll:", err);
            throw err;
        }
    }
}
module.exports = Model;