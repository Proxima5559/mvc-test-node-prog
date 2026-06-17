const model = require('./model');

class Controller {
    static async insert(req, res) {
        try {
            const users = req.body;
            if (!users || !Array.isArray(users)) {
                return res.status(400).json({ message: "To remind me, if there is no valid users array provided" });
            }

            let result = {};
            let userSet = new Set();

            for (let item of users) {
                userSet.add(item.name);
            }

            for (let name of userSet) {
                const userRecords = users.filter((x) => x.name === name);
                const totalDays = userRecords.length;
                const presentDays = userRecords.filter((x) => x.present === true).length;

                result[name] = {
                    totalDays: totalDays,
                    presentDays: presentDays,
                    attendancePercentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
                };
            }

            await model.insert(result);
            return res.status(200).json({ message: "Data inserted successfully", data: result });

        } catch (error) {
            console.error("Error in insert:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getAll(req, res) {

        try {
            const result = await model.getAll();

            if (!result) {
                return res.status(200).json({ attendanceReport: [], message: "To remind me, if there is no attendance data found" });
            }

            let attendanceReport = [];

            for (let name in result) {
                const percentage = result[name].attendancePercentage;

                const status = percentage >= 90 ? "Excellent" : "At Risk";

                attendanceReport.push({
                    name: name,
                    attendancePercentage: percentage,
                    status: status
                });
            }

            return res.status(200).json({ attendanceReport });

        } catch (error) {
            console.error("Error in getAll:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = Controller;