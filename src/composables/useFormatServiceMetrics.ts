import type { Service } from '@/types'
import numeral from 'numeral'
import { computed } from 'vue'

export const useFormatServiceMetrics = (metrics?: Service['metrics']) => {
  return computed(() => {
    if (!metrics) return undefined

    return {
      latency: `${metrics.latency}ms`,
      requests: `${numeral(metrics.requests).format('0a')}`,
      uptime: `${numeral(metrics.uptime).format('0%')}`,
      errors: `${numeral(metrics.errors).format('0%')}`,
    }
  })
}
