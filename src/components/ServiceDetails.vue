<template>
  <div
    v-if="selectedService"
    class="service-details"
  >
    <h1>
      {{ selectedService?.name }}
    </h1>
    <p>{{ selectedService?.description }}</p>

    <h2>Releases</h2>
    <p>TODO</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toValue } from 'vue'
import useServices from '@/composables/useServices'
import type { Service } from '@/types'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ServiceCatalog',
  setup() {

    // TODO: fetch only one item
    const { services, loading } = useServices()

    const route = useRoute()

    // const serviceId = ref('')
    // onBeforeRouteUpdate(async (to, from) => {
    //   // react to route changes...
    //   serviceId.value = to.params.id as string
    // })

    console.log({ services, id: route.params.id })

    const selectedService = computed<Service | undefined>(() => {
      return toValue(services).find((service) => service.id === route.params.id as string)
    })

    return {
      selectedService,
      loading,
    }
  },
})
</script>

<style scoped>
.service-details {
  margin: 1rem;
}
</style>
