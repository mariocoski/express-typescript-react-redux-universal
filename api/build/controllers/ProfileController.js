"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {User} from '../models/user';
function show(req, res) {
    // const user = req.user;
    // if(req.params.id.toString() !== user._id.toString()){
    //   res.status(401).json({error: "You are not authorized to see this resource"});
    //   return;
    // }
    res.send("ok");
    // return User.findById(user._id, (err, foundUser: any) => {
    //   if (err) {
    //     return res.status(422).json({ error: 'No user was found.' });
    //   }
    //   return res.json({email: foundUser.email});
    // });
}
function update(req, res) {
    res.json({ updated: true });
}
exports.default = {
    show: show,
    update: update
};
//# sourceMappingURL=ProfileController.js.map