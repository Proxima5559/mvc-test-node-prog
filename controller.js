const User = require('./mongoose.schema');

class Controller {
    static async insert(req, res) {
        try {
        const user = await User.create(req.body);
        return res.status(201).json({ message: "User inserted successfully", user });
        } catch (error) {
            console.error("Error in insert:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async update(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json({ message: "User updated successfully", user });
        } catch (error) {
            console.error("Error in update:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async deleteOne(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json({ message: "User deleted successfully", user });
        } catch (error) {
            console.error("Error in deleteOne:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async get(req, res){
        try{
            const user = await User.findById(req.params.id);
            res.json({ message: "User found successfully", user });
        } catch (error) {
            console.error("Error in get:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async getAll(req, res){
        try{
            const users = await User.find();
            res.json({ message: "Users found successfully", users });
        } catch (error) {
            console.error("Error in getAll:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = Controller;