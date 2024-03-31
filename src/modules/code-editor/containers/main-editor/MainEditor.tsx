import { useState } from 'preact/hooks'
import { MainEditorView } from './MainEditor.view'
import type * as _monaco from 'monaco-editor'
import { githubDark } from '../../themes/github-dark'
import { editor } from '../../signals/editor'

interface MainEditor {
  onChange?(): void
}

export const MainEditor = ({ onChange }: MainEditor) => {
  const [isLoading, setIsLoading] = useState(!!!editor.value)

  const handleMount = (editorInstance: _monaco.editor.IModel) => {
    editor.value = editorInstance

    setIsLoading(false)
  }

  const handleBeforeMount = (monaco: typeof _monaco) => {
    monaco.editor.defineTheme('github-dark', { ...(githubDark as any) })
  }

  return <MainEditorView onMount={handleMount} beforeMount={handleBeforeMount} isLoading={isLoading} onChange={onChange}/>
}
