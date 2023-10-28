export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters,_2, rootGetters){
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id == userId);
    },
    shouldFetchFromDB(state){
        let lastFetch = state.lastFetch;
        if(!lastFetch){
            return true;
        }
        let currentTime = new Date().getTime();
       return (currentTime - lastFetch)/1000 > 60;
    }

};