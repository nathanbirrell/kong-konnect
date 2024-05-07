import type { Version } from '@/types'

export const sortVersions: Parameters<Array<Version>['sort']>[0] = (a, b) => b.name.localeCompare(a.name)
