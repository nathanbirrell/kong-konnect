<template>
  <ServiceDetails />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ServiceDetails from '@/components/ServiceDetails.vue'

export default defineComponent({
  name: 'PageServiceDetails',
  components: {
    ServiceDetails,
  },
})
</script>
