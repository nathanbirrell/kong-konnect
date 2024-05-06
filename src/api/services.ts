import type { Service } from '@/types/service'
import axios from 'axios'

const BASE_API_URL = '/api/services'

export const fetchServices = async (searchQuery = '') => {
  let endpoint = BASE_API_URL

  if (searchQuery) {
    endpoint = `${BASE_API_URL}?q=${searchQuery}`
  }

  // TODO: consider schema validation (ie Valibot) to validate that external data shape equals expected
  return await axios.get<Service[]>(endpoint)
}
