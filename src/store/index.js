import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modules = {}
const modulesFiles = import.meta.glob('./modules/*.js', { eager: true })
for (const path in modulesFiles) {
  const key = path.match(/\.\/modules\/(\w+).js/)[1]
  modules[key] = modulesFiles[path].default
}
export default new Vuex.Store({
  modules,
  getters
})
