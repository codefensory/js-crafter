import * as esbuild from 'esbuild-wasm'

async function initialize() {
  await esbuild.initialize({
    wasmURL: '../../node_modules/esbuild-wasm/esbuild.wasm',
  })
}

initialize()

export default esbuild
