import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import notebook from './modules/notebook'
import note from './modules/note'
import trash from './modules/trash'
import user from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        test,
        notebook,
        note,
        trash,
        user
    },
    state:{
        poi:'hello Vuex',
        bookappear:false,
        noteIndex:true,
        login:false
    }
})