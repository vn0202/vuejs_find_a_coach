import actions from "./actions";
import getters from "./getters.js";
import mutations from "./mutations";
export default {
    namespaced:false,
    state(){
        return {
            userId: null,
            refreshToken: null,
            email: null,
            expiresIn: null,
            token: null,
        }
    },
       mutations:mutations,
       actions:actions,
       getters:getters,
}