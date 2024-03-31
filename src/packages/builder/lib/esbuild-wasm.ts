import * as esbuild from 'esbuild-wasm'

await esbuild.initialize({
  wasmURL: '../../node_modules/esbuild-wasm/esbuild.wasm',
})

export default esbuild
