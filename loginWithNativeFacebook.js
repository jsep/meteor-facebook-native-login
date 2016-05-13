import { _ } from "underscore"
import  facebookConnectPlugin from "./facebookConnectPlugin"
/*
* Log the user using the native facebook sdk, if not under Cordova, it will called Meteor.loginWithFacebook
* */
export default (options, callback)=>{

  if(!Meteor.isCordova){
    return Meteor.loginWithFacebook(options, callback)
  }

  // support a callback without options
  if (! callback && typeof options === "function") {
    callback = options;
    options = null;
  }

  facebookConnectPlugin.login(options.requestPermissions || [], (res)=>{
    let opts = _.extend(_.pick(res.authResponse, ['accessToken', 'expiresIn', 'userID']), {
      methodName: "native-facebook"
    });
    Accounts.callLoginMethod({methodArguments: [opts], userCallback: callback});
  }, (err)=>{
    console.error("err", err);
    callback(err, null);
  });

};