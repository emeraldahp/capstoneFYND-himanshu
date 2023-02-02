const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    adminName: {
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
    },
    verified: {
        type: Boolean,
        required: [false],
        default: false
    }
})

const SALT_FACTOR = 10;

adminSchema.pre('save', function (done) {
    const admin = this;

    if (!admin.isModified('password')) {
        done();
        return;
    }
    //gen salt using salt factor then call
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        //gen hash using pass and salt then call
        bcrypt.hash(admin.password, salt, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }

            admin.password = hashedPassword;
            done();
        });
    });

    console.log('executes immediately');
});

adminSchema.methods.checkPassword = async function (plainTextPassword) {
    const hashedPassword = this.password;
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};

module.exports = mongoose.model('Admin', adminSchema)