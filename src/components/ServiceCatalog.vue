<template>
  <div class="service-catalog">
    <div class="service-catalog__header">
      <div class="service-catalog__description">
        <h1>Service Hub</h1>

        <p>
          Organize services, manage and track versioning and API service
          documentation. Learn more
        </p>
      </div>

      <div class="service-catalog__controls">
        <div class="k-input-wrapper mr-2">
          <input
            v-model="searchQuery"
            class="k-input search-input"
            data-testid="search-input"
            placeholder="Search services"
            type="search"
          >
        </div>

        <k-button
          appearance="creation"
          icon="plus"
        >
          Service Package
        </k-button>
      </div>
    </div>

    <ul
      v-if="services.length"
      class="service-catalog-items"
    >
      <li
        v-for="service in services"
        :key="service.id"
        class="service"
      >
        <div>
          <p>
            {{ service.name }}
          </p>
          <p>{{ service.description }}</p>
        </div>
      </li>
    </ul>
    <NoResults v-else>
      No Services found.
    </NoResults>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useServices from '@/composables/useServices'
import NoResults from './NoResults.vue'

export default defineComponent({
  name: 'ServiceCatalog',
  components: { NoResults },
  setup() {
    // Set the search string to a Vue ref
    const searchQuery = ref('')

    // Import services from the composable
    const { services, loading } = useServices({ searchQuery })

    return {
      services,
      loading,
      searchQuery,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;
}

.service-catalog__header {
  // TODO: setup app-wide breakpoints and use variable here
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: start;
  }
}

.service-catalog__controls {
  display: flex;
  padding-top: 2rem;
}

.service-catalog-items {
  padding: 0;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 0.25rem;
  list-style: none;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}
</style>
