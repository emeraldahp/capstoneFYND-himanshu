import {createStore} from "vuex";
export default createStore({
    state: {
        userData:{
            userName: "none",
            currentCourse: "none"
        }
    },
    getters: {},
    mutations: {
        updateUser(state, payload){
            state.userData.userName = payload
        },
        updateCourse(state, payload) {
            state.userData.currentCourse = payload
        }
    },
    actions: {}
})