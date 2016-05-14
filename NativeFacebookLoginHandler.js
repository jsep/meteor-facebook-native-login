import { _ } from "underscore"
import { expect } from "chai"
import { HTTP } from "meteor/http"
import { Accounts } from "meteor/accounts-base";


class NativeFacebookLoginHandler {


  constructor() {
    // include all fields from facebook
    // http://developers.facebook.com/docs/reference/login/public-profile-and-friend-list/
    this._fields = ['id', 'email', 'name', 'first_name',
      'last_name', 'link', 'gender', 'locale', 'age_range'];
    this._apiUri = "https://graph.facebook.com/v2.6/me";
  }

  login(options) {
    console.log('native-facebook');
    if (options.methodName != 'native-facebook') {
      return;
    }
    // authResponse accessToken, expiresIn, userID
    expect(options).to.have.property("accessToken").that.is.a("string");
    expect(options).to.have.property("expiresIn").that.is.a("string");
    expect(options).to.have.property("userID").that.is.a("string");


    let user = Meteor.users.findOne({
      "services.facebook.id": options.userID
    });

    if (!user) {
      let identity = this.getIdentity(options.accessToken);
      _.extend(identity, {
        accessToken: options.accessToken,
        expiresAt: (+new Date) + (1000 * options.expiresIn)
      });
      user = {
        profile: {name: identity.name},
        services: {
          facebook: identity
        }
      };
      user._id = Accounts.insertUserDoc({}, user);
    }

    return {
      userId: user._id
    }

  }

  getIdentity(accessToken) {
    expect(accessToken).to.be.a("string");
    try {
      return HTTP.get(this._apiUri, {
        params: {
          access_token: accessToken,
          fields: this._fields
        }
      }).data
    } catch (ex) {
      let err = new Error("Failed to fetch identity from Facebook. " + ex.message);
      err.response = ex.response;
      throw err;
    }
  }
}

NativeFacebookLoginHandler.METHOD_NAME = "native-facebook";
let loginHandler = new NativeFacebookLoginHandler();

Accounts.registerLoginHandler((options)=>{
  return loginHandler.login(options)
});
export { NativeFacebookLoginHandler }
export { loginHandler }

