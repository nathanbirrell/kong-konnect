<template>
  <!-- TODO: consider using KCatalogItem from kongponents -->
  <KCard
    class="service-catalog-item"
    data-testid="service-catalog-item-{{ service.id }}"
    :title="service.name"
  >
    <template #statusHat>
      <template v-if="service.published">
        <KIcon
          color="#07A88D"
          icon="check"
          size="24"
        />
        Published to portal
      </template>
      <template v-else-if="service.configured">
        <KIcon
          color="#FABE5F"
          icon="spinner"
          size="24"
        />
        In progress
      </template>
      <template v-else>
        <KIcon
          color="#3C4557"
          icon="disabled"
          size="24"
        />
        Unpublished
      </template>
    </template>

    <template
      v-if="service.versions.length"
      #actions
    >
      <KButton
        appearance="secondary"
        size="small"
        style="min-height: none"
        :to="`/services/${service.id}`"
      >
        {{ service.versions.length }} versions
      </KButton>
    </template>

    <template #body>
      <KTruncate
        class="description"
        is-text-content
        :rows="3"
      >
        {{ service.description }}

        <!-- TODO: find an appropriate icon for expand/collapse -->
        <!-- https://kongponents.konghq.com/components/truncate.html#collapse-trigger -->
        <template #expand-trigger="">
          &nbsp;
        </template>
        <template #collapse-trigger="">
          &nbsp;
        </template>
      </KTruncate>

      <div
        v-if="service.metrics"
        class="metrics"
      >
        <div>
          <span class="status" /> <b>{{ formattedMetrics?.latency }}</b> latency
        </div>
        <div>
          <span class="status" /> <b>{{ formattedMetrics?.uptime }}</b> uptime
        </div>
        <div>
          <span class="status" />
          <b>{{ formattedMetrics?.requests }}</b> requests •
          <b>{{ formattedMetrics?.errors }}</b> errors
        </div>
      </div>

      <div class="details-link">
        <RouterLink
          class="color-grey-500"
          :to="`/services/${service.id}`"
        >
          Service details &rsaquo;
        </RouterLink>
      </div>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import type { Service } from '@/types'
import { useFormatServiceMetrics } from '@/composables/useFormatServiceMetrics'

interface Props {
  service: Service;
}

const props = defineProps<Props>()

const formattedMetrics = useFormatServiceMetrics(props.service.metrics)
</script>

<style>
.service-catalog-item {
  margin: 0.25rem;

  .description {
    color: var(--grey-500);
  }

  .metrics {
    color: var(--grey-500);
    margin-top: 1rem;

    .status {
      /* TODO: break out into seperate component */
      /* TODO: support postive/neutral/negative status */
      background-color: var(--green-400);
      border-radius: 50%;
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-bottom: 1px;
      margin-right: 0.25rem;
      margin-left: 0.25rem;
    }
  }

  .details-link {
    /* TODO: this link should anchor to the bottom, but do do so, we need to hack Card.body */
    font-size: var(--text-sm);
    font-weight: 500;
    margin-top: 1rem;

    a {
      color: var(--blue-500);
      text-decoration: none;
    }
  }
}

.service-catalog-item.kong-card .k-card-header .k-button {
  min-height: 0;
}
</style>
