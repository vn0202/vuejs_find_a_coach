export default {
    async contactCoach(context, payload) {
        const newData = {
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message,
        }
        let response = await fetch(`https://vue-http-demo-ff5a4-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method:"POST", 
            body: JSON.stringify(newData),
        });
        let responseData = response.json();
        if (!responseData.ok) {
            const error = new Error(responseData.message || "Can fetch to get data");
            throw error;
        }
        newData.id = responseData.name;
        context.commit('addRequest', newData);
    },
   async fetchRequests(context)
    {
        let coachId = context.rootGetters.userId;
        console.log(coachId);

       let response = await fetch(`https://vue-http-demo-ff5a4-default-rtdb.firebaseio.com/requests/${coachId}.json`);
    let responseData =await response.json();
    if(!response.ok)
    {
        const error = new Error(responseData.message || "Can ngia");
        throw error;

    }
    console.log(responseData);
    const requests = [];
    for(let key in responseData)
    {
        let request = {
            id:key,
            coachId:coachId,
            userEmail: responseData[key].userEmail,
            message:responseData[key].message,
        }
        requests.push(request);
    }
    context.commit('setRequest', requests);
    }
}