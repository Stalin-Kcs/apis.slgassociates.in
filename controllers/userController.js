// src/controllers/userController.js
const User = require('../models/userModel');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = UserController;
