import { ref, onBeforeMount, type Ref, toValue, watchEffect } from 'vue'
import type { Service } from '@/types/service'
import { fetchServices } from '@/api/services'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

// TODO: consider moving into a store

export default function useServices({
  searchQuery,
}: {
  searchQuery?: Ref<string>;
} = { searchQuery: undefined }) {
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)

  const getServices = async () => {
    try {
      // Initialize loading state
      loading.value = true

      // Fetch data from the API
      const { data } = await fetchServices(searchQuery && toValue(searchQuery.value))

      // Store data in Vue ref
      services.value = data
    } catch (err: unknown) {
      error.value = true
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
  })

  watchEffect(async () => {
    await getServices()
  })

  // Return stateful data
  return {
    services,
    loading,
    error,
  }
}
