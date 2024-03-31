import * as esbuild from 'esbuild-wasm'

esbuild.initialize({
  wasmURL: '/esbuild.wasm',
})

export default esbuild
