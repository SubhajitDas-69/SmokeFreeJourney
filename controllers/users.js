const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async(req, res, next) => {
    try{
        let {username, email, password, age, healthProblems, cigarettesPerDay} = req.body;
        let newUser = new User({
            email , username, age, healthProblems, cigarettesPerDay
        });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome!");
            res.redirect("/home");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login");
};

module.exports.login = async(req, res)=>{
    let redirectUrl = res.locals.redirectUrl || "/home";
    req.flash("success", "Welcome you are logged in!");

    if(req.user.role === "admin") {
        return res.redirect("/profile");
    }
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) =>{
        if(err) {
            return  next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/home");
    });
};