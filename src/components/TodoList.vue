<template>
  <div v-if="!loading">
    <div className="flex justify-between items-center mx-4">
      <h1 className="font-bold text-center text-2xl">
        {{ store.state.user.username }}'s ToDo List
      </h1>
      <div>
        <button
          className="mx-2 border-5 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add an item
        </button>
        <button
          className="mx-2 border-5 rounded bg-red-500 px-4 py-2 text-white"
        >
          Remove all items
        </button>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 mx-4">
      <div
        v-for="item of items"
        :key="item.id"
        className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20"
      >
        <h2 className="text-gray-800 text-xl font-semibold">
          {{ item.title }}
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          {{ item.detail }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import { ref } from '@vue/reactivity'
import { inject, onMounted } from '@vue/runtime-core'

export default {
  setup() {
    const store = inject('store')
    const items = ref([])
    const loading = ref(true)

    onMounted(() => {
      getItems()
    })

    async function getItems() {
      try {
        const { data, error, status } = await supabase
          .from('items')
          .select()
          .eq('user_id', store.state.user.id)
        if (data) {
          items.value = data
        }
        if (error && status !== 406) throw error
      } catch (error) {
        items.value = []
        alert('An error occurred !')
      } finally {
        loading.value = false
      }
    }

    return {
      items,
      loading,
      store,
      getItems
    }
  }
}
</script>

<style></style>
