import {createStore} from "vuex";
export default createStore({
    state: {
        userData:{
            loggedIn: false,
            userName: "none",
            currentCourse: "none"
        }
    },
    getters: {},
    mutations: {
        userLog(state, payload) {
            state.userData.loggedIn = payload
        },
        updateUser(state, payload){
            state.userData.userName = payload
        },
        updateCourse(state, payload) {
            state.userData.currentCourse = payload
        }
    },
    actions: {}
})