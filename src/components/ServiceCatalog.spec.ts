import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCatalog from './ServiceCatalog.vue'
import servicesFixture from '../../mocks/services'

// Mock the axios module for fetching API services
const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: servicesFixture,
  })))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) => vi.fn().mockResolvedValue(mockedResponses.get(url) !== undefined
        ? mockedResponses.get(url)()
        : undefined)(),
    },
  }
})

// Example component test for ServiceCatalog.vue
describe('ServiceCatalog', () => {
  it('shows the search input', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceCatalog)

    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  describe('Given a valid list of services returned from the API', () => {
    it('properly handles no services returned from the API', async () => {
      const wrapper = mount(ServiceCatalog)

      expect(wrapper.findTestId(`service-catalog-item-${servicesFixture[0].id}`).isVisible()).toBe(true)
    })
  })

  describe('Given no services returned from the API', () => {
    it('shows no results', async () => {
      // Provide a custom `mockedResponses` response payload instead of using the default mocked response
      mockedResponses.get('/api/services').mockReturnValue({
        data: [],
      })

      const wrapper = mount(ServiceCatalog)

      expect(wrapper.findTestId('no-results').isVisible()).toBe(true)
    })
  })
})
