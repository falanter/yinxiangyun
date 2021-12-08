const state = {
    poi:'hello Vuex',
    count:0,
    toTest:'aac'
}
const getters = {
    poi:state=>state.poi,
    toTest:state=>state.toTest
}
const mutations={
    setCount(state,n){
        state.count=n
        console.log('state.count','mutations',state.count)
        state.count++
        console.log('state.count','mutations',state.count)
    }
}
const actions = {
    add({commit},n){
        commit('setCount',n)
        console.log('state.count','actions',state.count)
    },
    arr(){
        console.log('arr')
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}