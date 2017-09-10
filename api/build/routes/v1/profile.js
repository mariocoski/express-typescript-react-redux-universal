"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../../controllers");
var passport = require("passport");
var utils_1 = require("../../utils");
var roles_1 = require("../../constants/roles");
var requireAuth = passport.authenticate('jwt', { session: false });
var router = express_1.Router();
router
    .get('/:id', requireAuth, utils_1.isAuthorized(roles_1.ROLE_USER), controllers_1.ProfileController.show);
exports.default = router;
