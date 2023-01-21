import {createStore} from "vuex";
export default createStore({
    state: {
        userName: "no-user"
    },
    getters: {},
    mutations: {
        updateUser(state, payload){
            state.userName = payload
        }
    },
    actions: {}
})