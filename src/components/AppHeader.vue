<template>
  <div
    className="fixed top-0 left-0 w-screen h-16 flex flex-row justify-between items-center
    bg-gray-700 text-white shadow-lg"
  >
    <router-link :to="{ name: 'home' }">
      <h3 className="mx-2">Supabase Demo ToDo List</h3>
    </router-link>
    <div
      v-if="username.length"
      className="flex flex-row justify-between items-center"
    >
      <h1 className="mx-2">Hello {{ username }}</h1>
      <button
        className="mx-2 border-5 rounded bg-blue-500 px-2 py-1 text-white"
        @click="logout"
      >
        Logout
      </button>
    </div>
    <router-link v-else :to="{ name: 'login' }">
      <h2 className="mx-2 border-5 rounded bg-green-500 px-2 py-1">Sign In</h2>
    </router-link>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import router from '../router'

export default {
  props: { username: { type: String, default: '' } },
  setup() {
    const store = inject('store')
    function logout() {
      store.state.user = {}
      router.push({ name: 'login' })
    }
    return {
      logout
    }
  }
}
</script>
