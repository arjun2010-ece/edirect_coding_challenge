const db = require("../models/index");
const user = require("../models/user");
const userModal = user(db.sequelize, db.Sequelize.DataTypes);

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const project = require("../models/project");
const projectModal = project(db.sequelize, db.Sequelize.DataTypes);

userModal.associate({Project: projectModal});


exports.signup = async (req) => {
    const {name, email, username, password} = req.body;
    const user =  new userModal({name, email, username});
    const existingUser = await userModal.findOne({where: {email}});

    if(existingUser){
        return {user: email, message: "User already exists"};
    }
    //generate salt and password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
    await user.save();
    return {user, message: "Signed up successfully."};
}

exports.login = async (req) => {
    const user = await userModal.findOne({ where : { email: req.body.email }});
    if(!user){
        return {user: {
            email: req.body.email
        }, message: "Please signup. User does not exists."}
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
        return {user: {email: user.email}, message: "email and password does not match. Please try again."}
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 360000});

    const {name, email, username, id} = user;

    return {
        user: {
            token, name, email, username, userId: id
        },
        message: "Logged in Successfully."
    };
}
