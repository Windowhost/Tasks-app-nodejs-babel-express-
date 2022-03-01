//Modules import
import User from "../models/Users"
const passport = require("passport");

//Controller that render the form register
export const registerCtr = (req, res) => {
    res.render("users/register")
}
 
// Contact form
export const contactsCtr = (req, res) => {
    res.render("contacts")
}

//Controller that render the form login
export const loginCtr = (req, res) => {
    res.render("users/login")
}
 
//Controller that recive and manage the data from form register
export const userResgisterCrt = async (req, res) => {
    const {username, email, password, confirmPass} = req.body;

    let errors = [];

    //Validatios
    if(username.length < 4 )
        // return res.status(500).json("User Name to short");
        errors.push({text: "The Name must be longer"})
  
    if( !email)
        // errors.push({text: "You hava to provide an email"})
    
    if(password.length < 4 )
        // errors.push({text: "password to short"})

    if(password !== confirmPass){
        // errors.push({text: "password do not mucht"})
    }
    
    if(errors.length > 0){
        res.render("users/register", {
            errors,
            username,
            email
         });
     }
    else{

         // Look for email coincidence
         const userName = await User.findOne({ username: username});
         if (userName )
            // errors.push({text: "Use alredy exist"})
            return res.redirect("/users/register");
            
            
         const userEmail = await User.findOne({ email: email});
         if (userEmail ) {
            req.flash("error", "The Email is already in use.");
            res.redirect("/users/register");

         }else{

            //Saving a New User
            const newUser = new User({username, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "You are registered now.");
            res.redirect("/users/login")
         }
    }
};

//Controller that recive and manage  the data from form login
export const signinCtr = passport.authenticate("local", {
    successRedirect: "/tasks/add",
    failureRedirect: "/users/login",
    failureFlash: true
});

// export const signinCtr = (req, res) => {
//   console.log(req.body)
// };

// Logout Funtion
export const userLogout = (req, res) => {
    req.logout();
    // req.flash("success_msg", "Tienes que logearte para creaar nuevas tareas.");
    res.redirect("/")
}