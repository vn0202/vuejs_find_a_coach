export default {
    async login(context, payload) {
        console.log(payload);
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqQzy-Zyfu3AAt_IIQHtYQZidXOzECquY', {
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
        const payloadData= {
            idToken: responseData.idToken,
            email: responseData.email,
            userId: responseData.userId,
            expiresIn: responseData.expiresIn,
            refreshToken: responseData.refreshToken,
        };
        context.commit('setUser', payloadData)
    },
    async signup(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqQzy-Zyfu3AAt_IIQHtYQZidXOzECquY', {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        });
        const responseData =await response.json();
        console.log(responseData.message);
        if (!response.ok) {
            const error = new Error(responseData.error.message);
            throw error;
        }
        const payloadData = {
            idToken: responseData.idToken,
            email: responseData.email,
            userId: responseData.userId,
            expiresIn: responseData.expiresIn,
            refreshToken: responseData.refreshToken,
        };
        context.commit('setUser', payloadData)
    },
};