import frameHtml from '../../assets/frame.html?raw'

export const RunnerCore = () => {
  return <iframe id="runner" style={{ display: 'none' }} srcDoc={frameHtml}></iframe>
}
