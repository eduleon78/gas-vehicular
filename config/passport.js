const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new localStrategy(
    function(email, password, done){
        Usuario.findOne({email: email}, function (err, usuario){
            if (err) { return done(err); }
            if (!usuario) {
              return done(null, false, { message: 'Email no existente o incorrecto.' });
            } 
            if (!usuario.validPassword(password)) {
                return done(null, false, {message: 'Password incorrecto.'});
            }
            return done(null, usuario);
        });
    }
));

passport.serializeUser(function(usuario, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Usuario.findById(id, function(err, usuario){
        done(err, usuario);
    });
});

module.exports = passport;