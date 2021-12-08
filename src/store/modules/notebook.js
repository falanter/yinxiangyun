import Notebook from '@/apis/notebooks'
import { Message } from 'element-ui'

const state = {
  notebooks: null,
  curBookId: null
}

const getters = {
  notebooks: state => state.notebooks || [],

  curBook: state => {
    if(!Array.isArray(state.notebooks)) return {}
    if(!state.curBookId) return state.notebooks[0] || {}
    return state.notebooks.find(notebook => notebook.id == state.curBookId) || {}
  }
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
    notebook.title = payload.title
  },

  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
  },

  setCurBook(state, payload) {
    state.curBookId = payload.curBookId
  }
}

const actions = {
  getNotebooks({ commit, state }) {
    if(state.notebooks !== null) return Promise.resolve()
    return Notebook.getAll()
      .then(res => {
        commit('setNotebooks', { notebooks: res.data })
      })
  },

  addNotebook({ commit }, payload) {
    return Notebook.addNotebook({ title: payload.title })
      .then(res => {
        console.log('add success...', res)
        commit('addNotebook', { notebook: res.data })
        Message.success(res.msg)
      })
  },

  updateNotebook({ commit }, payload) {
    return Notebook.updateNotebook(payload.notebookId, { title: payload.title })
      .then(res => {
        commit('updateNotebook', { notebookId: payload.notebookId, title: payload.title })
        Message.success(res.msg)
      })
  },

  deleteNotebook({ commit }, payload) {
    return Notebook.deleteNotebook(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', { notebookId: payload.notebookId })
        Message.success(res.msg)
      })
  } 
}


export default {
  state,
  getters,
  mutations,
  actions
}