const SET_TITLE = 'SET_TITLE'

const state = function () {
    return {
        title: 'Welcome'
    }
}

const getters = {
    title: (state) => {
        return state.title
    }
}

const mutations = {
    [SET_TITLE]: (state, newTitle) => {
        state.title = newTitle
    }
}

const actions = {
    setTitle: (context, newTitle) => {
        context.commit(SET_TITLE, newTitle)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}