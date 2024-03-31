import * as esbuild from 'esbuild-wasm'

esbuild.initialize({
  wasmURL: '/js-crafter/esbuild.wasm',
})

export default esbuild
