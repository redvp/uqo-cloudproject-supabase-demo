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
    beforeEnter: () => {
      alert('You need to login before accessing a ToDo List')
      if (!store.state.user.id) {
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
