import { describe, it } from "meteor/practicalmeteor:mocha"
import { facebookConnectPlugin} from "../facebookConnectPlugin"
import { expect } from "chai"


describe("facebookConnectPlugin", ()=>{

  it("Should throw an error calling facebookConnectPlugin under not Cordova env", ()=>{
    Object.keys(facebookConnectPlugin).forEach((key)=>{
      expect(()=>{
        facebookConnectPlugin[key]();
      }).to.throw(/Can't call 'facebookConnectPlugin/);
    });
  });
  
});