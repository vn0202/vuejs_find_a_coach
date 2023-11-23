export default {
  setUser(state, payload)
  {
    state.idToken = payload.idToken;
    state.email = payload.email;
    state.userId = payload.localId;
    state.expiresIn = payload.expiresIn;
    state.refreshToken = payload.refreshToken;
  }
};