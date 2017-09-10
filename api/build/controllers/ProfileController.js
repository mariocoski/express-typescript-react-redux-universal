"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
function show(req, res) {
    var user = req.user;
    if (req.params.id.toString() !== user._id.toString()) {
        res.status(401).json({ error: "You are not authorized to see this resource" });
        return;
    }
    return user_1.User.findById(user._id, function (err, foundUser) {
        if (err) {
            return res.status(422).json({ error: 'No user was found.' });
        }
        return res.json({ email: foundUser.email });
    });
}
function update(req, res) {
    res.json({ updated: true });
}
exports.default = {
    show: show,
    update: update
};
