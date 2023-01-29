const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const tutorSchema = new mongoose.Schema({
    tutorName: {
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

tutorSchema.pre('save', function (done) {
    const tutor = this;

    if (!tutor.isModified('password')) {
        done();
        return;
    }
    //gen salt using salt factor then call
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        //gen hash using pass and salt then call
        bcrypt.hash(tutor.password, salt, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }

            tutor.password = hashedPassword;
            done();
        });
    });

    console.log('executes immediately');
});

tutorSchema.methods.checkPassword = async function (plainTextPassword) {
    const hashedPassword = this.password;
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};

module.exports = mongoose.model('Tutor', tutorSchema)