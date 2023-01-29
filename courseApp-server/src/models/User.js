const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true],
        unique: true
    },
    email: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    }
})

const SALT_FACTOR = 10;

userSchema.pre('save', function (done) {
    const user = this;

    if (!user.isModified('password')) {
        done();
        return;
    }
    //gen salt using salt factor then call
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        //gen hash using pass and salt then call
        bcrypt.hash(user.password, salt, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }

            user.password = hashedPassword;
            done();
        });
    });

    console.log('executes immediately');
});

userSchema.methods.checkPassword = async function (plainTextPassword) {
    const hashedPassword = this.password;
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema)