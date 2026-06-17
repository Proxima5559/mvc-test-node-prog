const {redis} = require('./config');

class Model {
    static async insert(result) {
        try {
          return await redis.set('attendanceData', JSON.stringify(result));
        } catch (err) {
            console.error("Error in insert:", err);
            throw err;
        }
    }

    static async getAll() {
        try {
           const result = await redis.get('attendanceData');
           return result ? JSON.parse(result) : null;
        } catch (err) {
            console.error("Error in getAll:", err);
            throw err;
        }
    }
}
module.exports = Model;