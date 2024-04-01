import { signal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { Tooltip } from 'react-tooltip'

import { useBuidler } from './packages/builder/controllers/useBuilder'

import { RunnerCore } from './modules/runner/containers/runner-core/RunnerCore'
import { useRunner } from './modules/runner/controllers/useRunner'

import { useCodeEditor } from './modules/code-editor/controllers/useCodeEditor'
import { MainEditor } from './modules/code-editor/containers/main-editor/MainEditor'

import { useConsoleActions } from './modules/logger/controllers/useConsoleActions'
import { ConsoleLogs } from './modules/logger/containers/console-logs/ConsoleLogs'

const ran = signal<boolean | null>(null)

export function App() {
  const build = useBuidler()

  const run = useRunner()

  const editor = useCodeEditor()

  const logsActions = useConsoleActions()

  const handleCraft = async () => {
    const code = editor.value?.getValue() ?? ''

    logsActions.clearAndAdd('running index.ts')

    ran.value = true

    try {
      const buildResult = await build({
        name: 'entry.ts',
        code,
        loader: 'ts',
      })

      run(buildResult?.outputFiles?.[0].contents)
    } catch (err) {
      logsActions.add(err, 'error')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'Enter' && e.shiftKey) {
        e.preventDefault()

        handleCraft()
      }
    }

    document.addEventListener('keydown', handleKeyDown, false)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className="editor-container" style={{ height: ran.value ? '650px' : '500px' }}>
        <div className="relative p-2">
          <h4 className="editor-title">index.ts</h4>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-16 py-0.5 bg-[#00000040] text-gray-300 font-bold rounded-lg border border-[#61616140]"
            onClick={handleCraft}
            data-tooltip-id="run-tooltip"
            data-tooltip-content="Run code (shift + enter)"
            data-tooltip-place="bottom-end"
            data-tooltip-offset={3}
          >
            Run
          </button>
        </div>
        <div className="editor-code">
          <MainEditor onChange={() => (ran.value = ran.value === null ? null : false)} />
        </div>
        <div
          className="transition-[height] duration-200 border-t-[1px] border-[#ffffff20] flex flex-col-reverse overflow-auto"
          style={{
            height: ran.value === null ? '0px' : ran.value ? '200px' : '50px',
            margin: ran.value === null ? '0' : '10px 13px',
            overflow: ran.value ? 'auto' : 'hidden',
          }}
        >
          <ConsoleLogs />
        </div>
      </div>
      <RunnerCore />
      <Tooltip id="run-tooltip" className="tooltip" noArrow delayShow={300} />
    </>
  )
}
