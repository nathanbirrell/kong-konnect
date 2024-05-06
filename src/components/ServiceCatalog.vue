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

    <div
      v-if="visibleServices.length"
      class="service-catalog-items"
    >
      <ServiceCatalogItem
        v-for="service in visibleServices"
        :key="service.id"
        :service="service"
      />
    </div>
    <div
      v-if="visibleServices.length"
      class="d-block"
    >
      <KPagination
        :items="services"
        :page-sizes="pageSizeOptions"
        :total-count="services.length"
        @page-changed="handlePaginationChange"
      />
    </div>
    <NoResults v-else>
      No Services found.
    </NoResults>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toValue, computed } from 'vue'
import useServices from '@/composables/useServices'
import NoResults from './NoResults.vue'
import ServiceCatalogItem from './ServiceCatalogItem.vue'
import type { Service } from '@/types'

export default defineComponent({
  name: 'ServiceCatalog',
  components: { NoResults, ServiceCatalogItem },
  setup() {
    // Set the search string to a Vue ref
    const searchQuery = ref('')

    const pageSizeOptions = [9]
    const itemsPerPage = ref(pageSizeOptions[0])
    const startIndex = ref(0)

    // Import services from the composable
    const { services, loading } = useServices({ searchQuery })

    // TODO: consider splitting pagination logic from the pagination display logic
    // const pagination = usePagination({
    //   rowsPerPage,
    //   currentPage,
    //   arrayToPaginate: services,
    // })

    const visibleServices = computed<Service[]>(() => toValue(services).slice(startIndex.value, startIndex.value + itemsPerPage.value))

    // TODO: import PageChangedData type from https://github.com/Kong/kongponents/blob/d5aca1ea0c7956d8459f50c11bce8dbb720741eb/src/components/KPagination/KPagination.vue
    const handlePaginationChange = (input: unknown) => {
      console.log({ input })
      // @ts-expect-error
      startIndex.value = input.firstItem
    }

    return {
      services,
      loading,
      searchQuery,
      visibleServices,
      pageSizeOptions,
      handlePaginationChange,
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
  justify-content: flex-end;
  padding-top: 2rem;
}

.service-catalog-items {
  padding: 0;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0.25rem;
  list-style: none;
}
</style>
