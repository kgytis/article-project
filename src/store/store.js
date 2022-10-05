import Vue from 'vue';
import Vuex from 'vuex';

// Module imports
import articleModule from './modules/articles/index.js'
import authorsModule from './modules/authors/index.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        articles : articleModule,
        authors : authorsModule,
    }
})

export default store