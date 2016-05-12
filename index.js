import { Meteor } from "meteor/meteor"
import { facebookConnectPlugin } from "./facebookConnectPlugin"
import loginWithNativeFacebook from "./loginWithNativeFacebook"

Meteor.loginWithNativeFacebook = loginWithNativeFacebook;

export {facebookConnectPlugin};