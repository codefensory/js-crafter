import { signal } from '@preact/signals'
import { editor as _editor } from 'monaco-editor'

export const editor = signal<_editor.IModel | null>(null)
