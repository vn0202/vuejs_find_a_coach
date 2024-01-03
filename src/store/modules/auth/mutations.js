export default {
  setUser(state, payload)
  {
    state.token = payload.token;
    state.email = payload.email;
    state.userId = payload.localId;
    state.expiresIn = payload.expiresIn;
    state.refreshToken = payload.refreshToken;

  }
};