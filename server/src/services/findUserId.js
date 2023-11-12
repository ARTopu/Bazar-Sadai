const User = require("../models/userModel");
const createError = require('http-errors');
const mongoose = require('mongoose');

const findUserId = async (id) => {
    try {
        const options ={password:0};

        const user = await User.findById(id, options);

        if (!user){
            throw createError(404, "User does not exist with this ID");
        }
        return user;
    } catch (error) {
        if (error instanceof mongoose.Error){
            throw createError(400,"Invalid User ID");
        }
        throw error;
    }
}

module.exports = {findUserId};