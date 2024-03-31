import { signal } from '@preact/signals'
import { Methods } from 'console-feed/lib/definitions/Methods'

export const logs = signal<{ id: string | number; method: Methods; data: any[] }[]>([])
