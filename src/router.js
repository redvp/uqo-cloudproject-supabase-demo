import { createRouter, createWebHashHistory } from 'vue-router'
import SupabaseLogin from './components/SupabaseLogin.vue'
import AppHome from './components/AppHome.vue'
import TodoList from './components/TodoList.vue'
import store from './store'

const routes = [
  { path: '/', name: 'home', component: AppHome },
  { path: '/login', name: 'login', component: SupabaseLogin },
  {
    path: '/todo/:id',
    name: 'TodoList',
    component: TodoList,
    // Basic auth guard
    beforeEnter: to => {
      if (
        // Test is probably inaccurate because store.state.user returns a proxy
        store.state.user.id == undefined ||
        store.state.user.id != to.params.id
      ) {
        alert('You need to login before accessing a ToDo List')
        router.push({ name: 'home' })
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
