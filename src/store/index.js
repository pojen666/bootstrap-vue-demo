import Vue from 'vue'
import Vuex from 'vuex'
import webTitle from './modules/webTitle'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        webTitle
    }
})