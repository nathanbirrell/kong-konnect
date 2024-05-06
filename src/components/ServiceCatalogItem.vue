<template>
  <!-- TODO: consider using KCatalogItem from kongponents -->

  <KCard
    class="service-catalog-item"
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
      </KTruncate>

      <div
        v-if="service.metrics"
        class="metrics"
      >
        <div><span class="status" /> <b>{{ formattedMetrics?.latency }}</b> latency</div>
        <div><span class="status" /> <b>{{ formattedMetrics?.uptime }}</b> uptime</div>
        <div><span class="status" /> <b>{{ formattedMetrics?.requests }}</b> requests • <b>{{ formattedMetrics?.errors }}</b> errors</div>
      </div>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import type { Service } from '@/types'
import { computed } from 'vue'
import numeral from 'numeral'

interface Props {
  service: Service;
}

const props = defineProps<Props>()

const formattedMetrics = computed(() => {
  if (!props.service.metrics) return undefined

  return {
    latency: `${props.service.metrics.latency}ms`,
    requests: `${numeral(props.service.metrics.requests).format('0a')}`,
    uptime: `${numeral(props.service.metrics.uptime).format('0%')}`,
    errors: `${numeral(props.service.metrics.errors).format('0%')}`,
  }
})

</script>

<style>
.service-catalog-item {
  margin: 0.25rem;

  .description {
    color: var(--grey-500);
  }

  .metrics {
    color: var(--grey-500);

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
}
</style>
