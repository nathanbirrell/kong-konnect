<template>
  <KBreadcrumbs :items="breadcrumbItems" />

  <div
    v-if="service"
    class="service-details"
  >
    <h1>{{ service.name }}</h1>

    <!-- <KAlert alert-message="Welcome to Kong!" /> -->

    <KCard
      class="service-catalog-item"
      data-testid="service-catalog-item-{{ service.id }}"
      title="Service Details"
    >
      <!-- <template #title></template> -->
      <template #body>
        <template v-if="service.published">
          <KBadge appearance="success">
            Published to portal
          </KBadge>
        </template>
        <template v-else-if="service.configured">
          <KBadge appearance="warning">
            In progress
          </KBadge>
        </template>
        <template v-else>
          <KBadge appearance="neutral">
            Unpublished
          </KBadge>
        </template>
        <template v-if="service.type">
          <KBadge appearance="neutral">
            {{ service.type }}
          </KBadge>
        </template>

        <p class="detail-label">
          Description
        </p>
        <p>{{ service.description }}</p>

        <p class="detail-label">
          Metrics
        </p>

        <div
          v-if="formattedMetrics"
          class="metrics"
        >
          <div>
            <span class="status" />
            <b>{{ formattedMetrics.value?.latency }}</b> latency
          </div>
          <div>
            <span class="status" />
            <b>{{ formattedMetrics.value?.uptime }}</b> uptime
          </div>
          <div>
            <span class="status" />
            <b>{{ formattedMetrics.value?.requests }}</b> requests
          </div>
          <div>
            <span class="status" />
            <b>{{ formattedMetrics.value?.errors }}</b> errors
          </div>
        </div>
      </template>
    </KCard>

    <KCard
      class="versions"
      :title="`Versions (${service.versions.length})`"
    >
      <template #body>
        <!-- TODO: consider switching this to Table https://kongponents.konghq.com/components/table.html#table -->

        <div
          v-for="version in sortedVersions"
          :key="version.id"
          class="version"
        >
          <div class="version-number">
            {{ version.name }}
          </div>
          <div class="version-description">
            {{ version.description }}
          </div>
          <div
            v-if="version.developer"
            class="version-author"
          >
            <img
              v-if="version.developer.avatar"
              class="version-author-avatar"
              :src="version.developer.avatar"
            >
            <div>
              <span class="version-author-name">{{
                version.developer.name
              }}</span>

              <!-- FIXME: get real published date and format it here -->
              <span class="version-author-published">2 days ago</span>
            </div>
          </div>
        </div>
      </template>
    </KCard>
  </div>

  <div v-else-if="loading">
    <KSkeleton />
  </div>

  <div v-else>
    <KEmptyState cta-text="Back to all Services">
      <template #title>
        Service not found
      </template>
      <template #message>
        We couldn't find that service!
      </template>
    </KEmptyState>
  </div>
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import useServices from '@/composables/useServices'
import type { Service } from '@/types'
import { useRoute } from 'vue-router'
import { useFormatServiceMetrics } from '@/composables/useFormatServiceMetrics'
import { sortVersions } from '@/helpers/catalogHelpers'

// TODO: fetch only one item
const { services, loading } = useServices()

const route = useRoute()

// const serviceId = ref('')
// onBeforeRouteUpdate(async (to, from) => {
//   // react to route changes...
//   serviceId.value = to.params.id as string
// })

console.log({ services, id: route.params.id })

const service = computed<Service | undefined>(() => {
  return toValue(services).find(
    (service) => service.id === (route.params.id as string),
  )
})

const formattedMetrics = computed(() =>
  useFormatServiceMetrics(toValue(service)?.metrics),
)

const sortedVersions = computed(() =>
  toValue(service)?.versions.sort(sortVersions),
)

const breadcrumbItems = [
  {
    key: 'home',
    to: { path: '/' },
    title: 'Go Home',
    text: 'Home',
    icon: 'kong',
  },
  {
    key: 'here',
    title: 'Service Details',
    text: 'Service Details',
  },
]
</script>

<style scoped>

.k-breadcrumbs {
  /* TODO: this page needs a layout wrapper to avoid having to inset each direct child */
  margin: 1rem;
}

.service-details {
  margin: 1rem;

  .detail-label {
    font-weight: 500;
  }
}

.versions {
  margin-top: 1rem;

  .version {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 20% 60% 20%;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--grey-200);

    &:last-of-type {
      border-bottom: none;
    }
  }

  .version-author {
    display: flex;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      line-height: 1;
      padding-left: 0.5rem;
    }

    .version-author-avatar {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }
    .version-author-name {
      font-weight: 500;
    }
    .version-author-published {
      color: var(--grey-400);
    }
  }
}
</style>
