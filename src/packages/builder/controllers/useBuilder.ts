import { Entry } from '~/types/Entry'
import esbuild from '../lib/esbuild-wasm'

export const useBuidler = () => {
  const handleBuild = async (entry: Entry, _source = []) => {
    return esbuild.build({
      stdin: {
        contents: entry.code,
        loader: entry.loader || 'ts',
        sourcefile: entry.name,
        resolveDir: '.',
      },
      bundle: true,
      write: false,
      format: 'cjs',
      treeShaking: false,
      plugins: [],
    })
  }

  return handleBuild
}
