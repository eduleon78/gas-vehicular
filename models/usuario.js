var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // validar que haya un unico email de cada usuario
var Reserva = require('./reserva');
const bcrypt = require('bcrypt'); // encriptar el password que viene en string
const crypto = require('crypto');
const saltRounds = 10;

const Token = require('../models/token');
const mailer = require('../mailer/mailer');

var Schema = mongoose.Schema;

const validateEmail = function(email){
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true, //unique validator
        validate: [validateEmail, 'Por favor ingrese un email valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    },
    googleId: String,
    facebookId: String
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario.' });

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(vehiId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, vehiculo: vehiId, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}
usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return console.log(err.message); }
        
        const mailOptions = {
            from: 'no-reply@gas-vehicular-margarita.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola,\n\n' + 'Por favor, para verificar su cuenta haga click en este link: \n' + 'http://localhost:5000' + '\/token/confirmation\/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) { return console.log(err.message); }

            console.log('Se ha enviado un email de bienvenida a: ' + email_destination + '.');
        });
    });
};

usuarioSchema.methods.resetPassword = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return console.log(err.message); }

        const mailOptions = {
            from: 'no-reply@gas-vehicular.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta',
            text: 'Hola,\n\n'+ 'Por favor, para resetear el password de su cuenta haga click en este link: \n' + 'http://localhost:5000' + '/resetPassword/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, function(err) {
            if (err) { return console.log(err); }

            console.log('Se ha enviado un email de reseteo de password a:  '+ email_destination + '.');
        });
    });
}



usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or:[
            {'googleId': condition.id}, {'email': condition.emails[0].value}
    ]}, (err, result) => {
        if (result) { // login
            callback(err, result);
        } else { // registro
            console.log('---------- CONDITION ----------');
            console.log(condition);
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = condition._json.etag;
            console.log('---------- VALUES ----------');
            console.log(values);
            self.create(values, (err, result) => {
                if (err) {console.log(err);}
                return callback(err, result);
            });
        }
    })
};
usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or:[
            {'facebookId': condition.id}, {'email': condition.emails[0].value}
    ]}, (err, result) => {
        if (result) { // login
            callback(err, result);
        } else { // registro
            console.log('---------- CONDITION ----------');
            console.log(condition);
            let values = {};
            values.facebookId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = crypto.randomBytes(16).toString('hex');
            console.log('---------- VALUES ----------');
            console.log(values);
            self.create(values, (err, result) => {
                if (err) {console.log(err);}
                return callback(err, result);
            });
        }
    })
};


module.exports = mongoose.model('Usuario', usuarioSchema);