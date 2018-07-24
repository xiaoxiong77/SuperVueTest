const state = {
    id: 0,
    dataList: []
}

const actions = {

}

const mutations = {
    addData(state, payload){
        state.id++;
        state.dataList.push({id: state.id, value: payload.data});
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}