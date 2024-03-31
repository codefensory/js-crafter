import { Console } from 'console-feed'
import { logs } from '../../signals/logs'
import { Methods } from 'console-feed/lib/definitions/Methods'

type SendLogs = (data: { method: Methods; args: any[] }) => void

type WindowPlusSendLog = typeof window & { sendLog: SendLogs }

const customWindow = window as WindowPlusSendLog

customWindow.sendLog = data => {
  if (import.meta.env.DEV) {
    console.log('[debug] receiving', ...data.args)
  }

  logs.value = [...logs.value, { id: Math.random(), method: data.method, data: [...data.args] }]
}

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
