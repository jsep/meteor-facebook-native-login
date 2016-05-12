
/*
* Log the user using the native facebook sdk, if not under Cordova, it will called Meteor.loginWithFacebook
* */
export default (options, callback)=>{

  if(!Meteor.isCordova){
    return Meteor.loginWithFacebook(options, callback)
  }

};