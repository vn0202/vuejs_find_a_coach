import router from "@/router";
let timer = null;
export default {
    async login(context, payload) {
       return  context.dispatch('auth', {
            ...payload,
            method: 'login',
        })

    },

    async auth(context, payload) {

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqQzy-Zyfu3AAt_IIQHtYQZidXOzECquY";
        if (payload.mode == 'signup') {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqQzy-Zyfu3AAt_IIQHtYQZidXOzECquY";

        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.error.message || "Cannot authneticate");
            throw error;
        }
        const payloadData = {
            token: responseData.idToken,
            email: responseData.email,
            userId: responseData.userId,
            expiresIn: responseData.expiresIn,
            refreshToken: responseData.refreshToken,
        };
        let expiresIn = +responseData.expiresIn * 1000;

        let expireDate = expiresIn +  new Date().getTime() ;
        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('expireDate', expireDate);

            timer = setTimeout(function()
              {
                context.dispatch('logout');
              }, expiresIn);
        
        context.commit('setUser', payloadData);
        router.push('/');

    },
    async signup(context, payload) {
       return  context.dispatch('auth', {
            ...payload,
            method: 'signup'
        })
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            email: null,
            userId: null,
            expiresIn: null,
            refreshToken: null,
        })
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        clearTimeout(timer);
        router.push('/auth');
    },
    tryLogin(context)
    {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        let expireDate = localStorage.getItem('expireDate');
        let restTimeExpire = +expireDate - new Date().getTime()   ;
        if(restTimeExpire > 0)
        {
        
        timer = setTimeout(()=>{context.dispatch('logout')}, restTimeExpire);
        if(token && userId)
        {
            context.commit('setUser', {
                token:token,
                userId:userId,
                expiresIn: null,
            })
        }
    }
    }
};