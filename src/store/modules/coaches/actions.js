export default {
 async registerCoach(context, payload){
     const userId = context.rootGetters.userId;
        const coachData = {
            firstName : payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas,
        }
      const response = await  fetch(`https://vue-http-demo-ff5a4-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method:"PUT",
            body: JSON.stringify(coachData),
        });
        if(!response.ok)
        {
            //handle error here
            return;
        }


        context.commit('registerCoach', {...coachData, id:userId});
    },
    async loadCoaches(context, payload){
        if(!payload.forceFetch && !context.getters.shouldFetchFromDB)
        {
            return;
        }
         
        const response = await  fetch('https://vue-http-demo-ff5a4-default-rtdb.firebaseio.com/coaches.json');
        const responseData = await response.json();
        if(!response.ok)
        {
            //handle error
            const error = new Error(responseData.message || "Can not fetching data");
            throw error;

        }
        const coaches = [];
        for (const key in responseData) {
            let transfer = {
                id:key,
                firstName: responseData[key].firstNam,
                lastName: responseData[key].lastName,
                hourlyRate: responseData[key].hourlyRate,
                description: responseData[key].description,
                areas: responseData[key].areas,
            };
            console.log(transfer);
            coaches.push(transfer);
        }
        context.commit('setCoaches', coaches);
        context.commit('setLastFetch');
    }
};