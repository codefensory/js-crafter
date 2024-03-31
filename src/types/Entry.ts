import { Loader } from 'esbuild-wasm'

export interface Entry {
  name: string
  code: string
  loader: Loader
}
