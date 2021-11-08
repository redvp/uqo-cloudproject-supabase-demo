import { reactive } from 'vue'
import { supabase } from './supabase'
import router from './router'

const state = reactive({
  user: {}
})

const methods = {
  async login(username, password) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select()
        .match({ username, password })
        .single()
      if (data) {
        state.user = data
        // route param with username
        router.push({ name: 'TodoList', params: { id: state.user.id } })
      }
      if (error) throw error
    } catch (err) {
      alert(`An error occured !`)
    }
  },
  logout() {
    state.user = {}
  }
}

export default {
  state,
  methods
}
