export default {
    initializeStore (context) {
        console.log("inside actions.js initializeStore()")
        context.commit('retrieveFormsFromLocalStorage')
    },

    saveDoNotPrint (context) {
        console.log("inside actions.js saveDoNotPrint()");
        context.commit('stopEditingForm');
        context.commit('saveFormsToLocalStorage');
    },

    deleteSpecificForm({ commit }, prohibition_number) {
        commit('deleteForm', prohibition_number)
        commit('stopEditingForm');
    },


}