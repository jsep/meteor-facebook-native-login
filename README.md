# meteor-facebook-native-login
This package use [cordova-plugin-facebook4](https://github.com/jeduan/cordova-plugin-facebook4) to
login using native Facebook Sdk.

Documentation of the Cordova plugin [here](https://github.com/jeduan/cordova-plugin-facebook4).

## Usage

This package add a new function `Meteor.loginWithNativeFacebook(options, callback);`, the params are the same of`
Meteor.loginWithFacebook`. If you call under a not Cordova
environment it with will call `Meteor.loginWithFacebook(options, callback);`.


## Using facebookConnectPlugin
This package export `facebookConnectPlugin`, if you are not running in Cordova it will export a object with the same
API as the Cordova plugin object, but if you try to use any function of the object it will throw an error ie:
```
import { facebookConnectPlugin } from "meteor/jsep:facebook-native-login"

// if Meteor.isCordova it will calle the orignal facebookConnectPlugin of cordova-plugin-facebook4,
// otherwise it will thrown an error
facebookConnectPlugin.login()

```