const user = JSON.parse(localStorage.getItem('user'));
const initialState = user? { status: { loggedIn: true }, user }: { status: { loggedIn: false }, user: null };

export const auth = {
           namespaced: true,
           state: initialState,
         mutations: {
           // ミューテーションを定義
           loginSuccess(state, user) {
             state.status.loggedIn = true;
             state.user = user;
           },
           loginFailure(state) {
             state.status.loggedIn = false;
             state.user = null;
           },
           logout(state) {
             state.status.loggedIn = false;
             state.user = null;
           },
         },
         actions: {
           login({ commit }, user) {
             commit("loginSuccess", user);
           },
           logout({ commit }) {
             commit("logout");
           },
         },
       };