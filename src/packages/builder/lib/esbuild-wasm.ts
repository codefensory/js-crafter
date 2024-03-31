import * as esbuild from 'esbuild-wasm'

esbuild.initialize({
  wasmURL: '../../node_modules/esbuild-wasm/esbuild.wasm',
})

export default esbuild
