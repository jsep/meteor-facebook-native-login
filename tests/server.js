import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { HTTP } from "meteor/http"
import { expect } from "chai"
import { describe, it } from "meteor/practicalmeteor:mocha"
import { NativeFacebookLoginHandler } from "../server"

chai.use(sinonChai);

describe("Login method facebook-native", ()=>{

  beforeEach(()=>{
    this.loginHandler = new NativeFacebookLoginHandler();
    this.accessToken = "EAADQ34PLCsYBACZBQUY6TgQvqjuc2Ng2Z";
    this.options = {
      methodName: NativeFacebookLoginHandler.METHOD_NAME,
      accessToken: this.accessToken,
      userID: "1231234123",
      expiresIn: "38123"
    };
    sinon.stub(HTTP, "get").returns({data: {}});
    sinon.stub(this.loginHandler, "getIdentity").returns({});
  });

  afterEach(()=>{
    HTTP.get.restore();
    // Since in restoring the stub in getIdentity() suite make sure it exists before calling it.
    let restore = this.loginHandler.getIdentity.restore;
    restore && restore.call(this.loginHandler.getIdentity);
  });


  describe("getIdentity()", ()=>{

    beforeEach(()=>{
        this.loginHandler.getIdentity.restore();
    });

    it("should call facebook to get user public fields", ()=>{
      this.loginHandler.getIdentity(this.accessToken);
      expect(HTTP.get).to.have.been.calledWith(this.loginHandler._apiUri, {
        params: {
          access_token: accessToken,
          fields: this.loginHandler._fields
        }
      });
    });
  });


  it("return undefined if it's not facebook-native login method", ()=>{
      let value = this.loginHandler.login({
        methodName: "login"
      });
      expect(value).to.equal(undefined);
  });

  xit("should search for Meteor user", ()=>{
    sinon.stub(Meteor.users, "findOne");

    this.loginHandler.login(this.options);

    expect(Meteor.users.findOne).to.have.been.calledWith({
      "services.facebook.id": this.options.userID
    });

    Meteor.users.findOne.restore()
  });

  it("get user default fields if user don't exists", ()=> {
    this.loginHandler.login(this.options);
    expect(this.loginHandler.getIdentity).to.have.been.calledWith(this.accessToken);
  });

});