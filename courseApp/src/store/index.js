import {createStore} from "vuex";
export default createStore({
    state: {
        userData: {
            loggedIn: false,
            userName: "none",
            courseName: "none",
        },
        tutorData: {
            loggedIn: false,
            tutorName: "none"
        },
        adminData: {
            loggedIn: false,
            adminName: "none"
        }
    },
    getters: {},
    mutations: {
        userLog(state, payload) {
            state.userData.loggedIn = payload
        },
        updateUser(state, payload) {
            state.userData.userName = payload
        },
        updateCourse(state, payload) {
            state.userData.courseName = payload
        },
        tutorLog(state, payload) {
            state.tutorData.loggedIn = payload
        },
        updateTutor(state, payload) {
            state.tutorData.tutorName = payload
        },
        adminLog(state, payload) {
            state.adminData.loggedIn = payload
        },
        updateAdmin(state, payload) {
            state.adminData.adminName = payload
        }
    },
    actions: {}
})