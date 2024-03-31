export const useRunner = () => {
  const handleRun = (code: Uint8Array) => {
    const runnerCore = document.getElementById('runner') as HTMLIFrameElement

    if (!runnerCore) {
      throw new Error("[Error]: can't run code. Runner core don't exists")
    }

    eval('window.codeUrl = "' + URL.createObjectURL(new Blob([code], { type: 'application/javascript' })) + '"')

    runnerCore.contentWindow?.postMessage({ type: 'reload' }, '*')
  }

  return handleRun
}
