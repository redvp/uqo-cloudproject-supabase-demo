<template>
  <div class="w-full max-w-xs">
    <form
      class="
        flex flex-col
        justify-center
        items-center
        bg-gray-100
        shadow-lg
        rounded
        px-8
        pt-6
        pb-8
        mb-4
      "
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          v-model="username"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:ring-2
          "
          type="text"
          placeholder="Username..."
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:ring-2
          "
          type="password"
          placeholder="Password..."
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none focus:shadow-outline
          "
          type="button"
          @click="login"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { store } from '../store'
import { supabase } from '../supabase'

export default {
  data() {
    return { username: '', password: '', loading: false }
  },
  methods: {
    async login() {
      try {
        this.loading = true
        console.log(this.username)
        console.log(this.password)
        let { data, error } = await supabase
          .from('users')
          .select(`username, password`)
          .eq('username', this.username)
          .eq('password', this.password)
          .single()

        if (data) {
          store.user = data
        }
        if (error) throw error
      } catch (error) {
        alert(`An error occured !`)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
