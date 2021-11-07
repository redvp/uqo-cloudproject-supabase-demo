<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import AppHeader from './components/AppHeader.vue'
import SupabaseLogin from './components/SupabaseLogin.vue'
import { store } from './store'
import { supabase } from './supabase'

export default {
  components: {
    AppHeader,
    SupabaseLogin
  },
  setup() {
    store.user = supabase.auth.user()
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user
    })
    return {
      store
    }
  }
}
</script>

<template>
  <div
    className="flex flex-col justify-center items-center
              bg-gray-100 h-screen w-screen"
  >
    <AppHeader :username="store.user?.username" />
    <SupabaseLogin />
  </div>
</template>
