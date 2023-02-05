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
            adminName: "none",
            verified: false
        },
        loading: false,
        sectionsPanel: false,
        sectionsBtn: false,
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
        },
        loadingStatus(state, payload) {
            state.loading = payload
        },
        sectionsPanelStatus(state, payload) {
            state.sectionsPanel = payload
        },
        setAdminVerified(state, payload) {
            state.adminData.verified = payload
        },
        setSectionsBtn(state, payload) {
            state.sectionsBtn = payload
        }
    },
    actions: {
        userLogOut(context){
            context.commit("userLog", false)
            context.commit("updateUser", "none")
            context.commit("updateCourse", "none")
        },
        tutorLogOut(context){
            context.commit("tutorLog", false)
            context.commit("updateTutor", "none")
        },
        adminLogOut(context){
            context.commit("adminLog", false)
            context.commit("updateAdmin", "none")
        }
    }
})