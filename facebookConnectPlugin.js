
class NotUnderCordovaEnv extends Error{

  constructor(key){
    let message = `Can't call 'facebookConnectPlugin.${key}'. You aren't under Cordova environment.`;
    super(message);
    this.name = this.constructor.name;
  }
}


/*
* Create a fake 'facebookConnectPlugin' object that  throws an error
* if it call under a not Cordova environment
* */
let facebookConnectPlugin = global.facebookConnectPlugin || (()=>{

    let fakeFacebookConnectPlugin = {};

    let makeNopFunc = (key)=>{
      return ()=>{
        throw new NotUnderCordovaEnv(key);
      }
    };

    // API from https://github.com/jeduan/cordova-plugin-facebook4
    ["login", "logout", "getLoginStatus", "showDialog"].forEach((key)=>{
      fakeFacebookConnectPlugin[key] = makeNopFunc(key);
    });

    return fakeFacebookConnectPlugin;
  })();
export default facebookConnectPlugin;
export {facebookConnectPlugin};
export {NotUnderCordovaEnv};