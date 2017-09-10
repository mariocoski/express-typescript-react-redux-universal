"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var bluebird = require("bluebird");
var roles_1 = require("../constants/roles");
mongoose.Promise = bluebird;
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: { type: String },
        lastName: { type: String }
    },
    role: {
        type: String,
        enum: [roles_1.ROLE_USER, roles_1.ROLE_PROFESSIONAL, roles_1.ROLE_ADMIN, roles_1.ROLE_SUPERADMIN],
        default: roles_1.ROLE_USER
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {
    timestamps: true
});
UserSchema.pre('save', function (next) {
    var _this = this;
    var user = this;
    var SALT_FACTOR = 10;
    if (!this.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(_this.password, salt, function (err, hash) {
            if (err)
                return next(err);
            _this.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
exports.User = mongoose.model('User', UserSchema);
