import { Editor } from '@monaco-editor/react'
import type * as _monaco from 'monaco-editor'

interface MainEditorProps {
  onMount?(editor: _monaco.editor.IModel): void
  onChange?(): void
  beforeMount?(monaco: typeof _monaco, editor: _monaco.editor.IModel): void
  isLoading?: boolean
}

export const MainEditorView = ({ onMount, beforeMount, isLoading, onChange }: MainEditorProps) => {
  return (
    <div className="h-full">
      <div className="progress" style={{ opacity: isLoading ? 1 : 0 }}>
        <div className="progress-value"></div>
      </div>
      <div className="h-full" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s' }}>
        <Editor
          defaultLanguage="typescript"
          path="index.ts"
          defaultValue={'console.log("hello world")'}
          onMount={onMount as any}
          onChange={onChange}
          theme="github-dark"
          beforeMount={beforeMount as any}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  )
}
