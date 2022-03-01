const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    // Match Email's User
    const user = await User.findOne({ email: email });
    //Si el user no existe
    if (!user) {
        return done(null, false, { message: 'Not User found.' });
    } else {
        //Si existe el user Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password.' });
        }
    }
}));

//para almacenar el idcdel user en una seccion para cuando se suthentique evitar tener que estar pideindoles los datos
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Toma un un id y genera un user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
