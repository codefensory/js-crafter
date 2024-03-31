import { Console } from 'console-feed'
import { logs } from '../../signals/logs'

window.addEventListener('message', e => {
  const data = e.data

  if (data.type === 'log') {
    ;(console as any)[data.method]?.(...data.args)

    logs.value = [...logs.value, { id: Math.random(), method: data.method, data: [...data.args] }]
  }
})

export const ConsoleLogs = () => {
  return (
    <Console
      logs={logs.value as any}
      variant="dark"
      styles={{
        LOG_BORDER: '#ffffff07',
        LOG_COMMAND_BACKGROUND: '#00000010',
        LOG_COMMAND_COLOR: '#ffffff70',
        BASE_BACKGROUND_COLOR: '#00000000',
      }}
    />
  )
}
