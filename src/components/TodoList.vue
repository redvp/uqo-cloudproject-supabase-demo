<template>
  <div v-if="!loading">
    <div className="flex justify-between items-center mx-4">
      <div className="font-bold text-center text-2xl">
        <h1>{{ store.state.user.username }}'s ToDo List</h1>
      </div>
      <div>
        <button
          className="mx-2 border-5 rounded bg-blue-600 px-2 py-1 text-white"
          @click="addItem()"
        >
          Add an item
        </button>
        <button
          className="mx-2 border-5 rounded bg-red-500 px-2 py-1 text-white"
          @click="deleteFromItems({ user_id: store.state.user.id })"
        >
          Remove all items
        </button>
      </div>
    </div>
    <div
      v-if="!items.length"
      className="flex flex-col text-center justify-center items-center mt-6"
    >
      <h1 className="text-gray-800 text-xl">Your ToDo List is empty !</h1>
      <p className="mt-2 text-gray-600 text-sm">start adding items</p>
    </div>
    <div className="grid grid-cols-3 gap-4 mx-4">
      <div
        v-for="item of items"
        :key="item.id"
        className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20"
      >
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-gray-800 text-xl font-semibold">
            {{ item.title }}
          </h2>
          <button
            className="mx-2 border-5 rounded bg-red-500 px-2 py-1 text-white"
            @click="deleteFromItems({ id: item.id })"
          >
            Delete
          </button>
        </div>
        <p className="mt-2 text-gray-600 text-sm">
          <strong>{{ item.id }} : </strong> {{ item.detail }}
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
        loading.value = true
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

    async function addItem() {
      try {
        loading.value = true
        const item = {
          title: 'Programmatic Insert',
          detail: 'Testing programmatic inserts',
          user_id: store.state.user.id
        }
        const { data, error, status } = await supabase
          .from('items')
          .insert(item, { returning: 'representation' })
        console.log('Data returned after insert : ')
        console.log(data)
        if (error && status !== 406) throw error
      } catch (error) {
        alert('An error occurred !')
      } finally {
        getItems()
      }
    }

    async function deleteFromItems(matchingFilter) {
      try {
        loading.value = true
        const { data, error, status } = await supabase
          .from('items')
          .delete({ returning: 'representation' })
          .match(matchingFilter)
        console.log('Data successfully deleted : ')
        console.log(data)
        if (error && status !== 406) throw error
      } catch (error) {
        alert('An error occurred !')
      } finally {
        getItems()
      }
    }

    return {
      items,
      loading,
      store,
      addItem,
      deleteFromItems
    }
  }
}
</script>

<style></style>
