import { Methods } from 'console-feed/lib/definitions/Methods'
import { logs } from '../signals/logs'

export const useConsoleActions = () => {
  const clearAndAdd = (data: any | any[], method: Methods = 'command') => {
    logs.value = [{ id: Math.random(), method, data: Array.isArray(data) ? [...data] : [data] }]
  }

  const add = (data: any | any[], method: Methods = 'command') => {
    logs.value = [...logs.value, { id: Math.random(), method, data: Array.isArray(data) ? [...data] : [data] }]
  }

  const clear = () => {
    logs.value = []
  }

  return { add, clearAndAdd, clear }
}
