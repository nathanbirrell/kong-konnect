import type { Developer } from './developer'

export type ServiceType = 'REST' | 'HTTP';

export type Version = {
  id: string;
  name: string;
  description: string;
  developer?: Developer;
  updated_at: Date;
}

export type Metrics = {
  latency: number;
  uptime: number;
  requests: number;
  errors: number;
}

export type Service = {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  published: boolean;
  configured: boolean;
  versions: Version[];
  metrics: Metrics;
};
