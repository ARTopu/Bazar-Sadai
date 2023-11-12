const {Schema, model}= require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"User name is required"],
        trim: true,
        minlength: [3,"The length of user name can be minimum of 3 characters"],
        maxlength: [31,"The length of user name can be maximum of 31 characters"],
    },
    email: {
        type: String,
        required: [true,"User email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate:{
            validator:  (v) => {
                return /^\w+([\.−]?\w+)*@\w+([\.−]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email.",
        },
    },
    password: {
        type: String,
        required: [true,"User password is required"],
        minlength: [6,"The length of user password can be minimum of 6 characters"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
        type: String,
        default: defaultImagePath,
    },
    address: {
        type: String,
        required: [true,"User address is required"],
    },
    phone: {
        type: String,
        required: [true,"User phone number is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

const User = model('users', userSchema);
module.exports = User;