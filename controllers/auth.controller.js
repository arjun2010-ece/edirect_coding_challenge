const { signup, login} = require("../services/auth.service");

exports.signupController = (req, res) => {
    signup(req).then(data => {
        res.status(200).json({
            user: data.user,
            message: data.message
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.loginController = (req, res) => {
    login(req).then(data => {
        res.status(200).json({
            data: data.user,
            message: data.message
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}