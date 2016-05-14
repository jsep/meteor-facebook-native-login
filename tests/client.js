import { describe, it } from "meteor/practicalmeteor:mocha"
import chai from "chai"
import { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { facebookConnectPlugin} from "meteor/jsep:facebook-native-login"

chai.use(sinonChai);


describe("Native facebook login", ()=>{

  beforeEach(()=>{
    sinon.stub(Meteor, "loginWithFacebook");
    sinon.stub(facebookConnectPlugin, "login");
    this.permissions = ['email'];
  });

  afterEach(()=>{
    Meteor.loginWithFacebook.restore();
    facebookConnectPlugin.login.restore();
  });

  it("Should call Meteor.loginWithFacebook if not under Cordova environment", ()=>{

    Meteor.loginWithNativeFacebook(this.permissions);
    expect(Meteor.loginWithFacebook).to.have.been.called;
  });

  it("Should call native facebook api to login", ()=>{
    Meteor.isCordova = true;

    Meteor.loginWithNativeFacebook({requestPermissions:this.permissions}, ()=>{});
    expect(facebookConnectPlugin.login).to.have.been.calledWith(this.permissions);

    Meteor.isCordova = false;
  })

});