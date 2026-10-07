export async function openPdf(loadPdf) {
  const pdfWindow = window.open('about:blank', '_blank')

  if (!pdfWindow) {
    throw new Error('Permita las ventanas emergentes para abrir el PDF del plan.')
  }

  pdfWindow.opener = null
  pdfWindow.document.title = 'Generando PDF del plan'
  pdfWindow.document.body.textContent = 'Generando PDF del plan...'

  let url

  try {
    const blob = await loadPdf()

    if (pdfWindow.closed) {
      return
    }

    url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
    pdfWindow.location.replace(url)
    window.setTimeout(() => URL.revokeObjectURL(url), 60000)
  } catch (error) {
    if (url) {
      URL.revokeObjectURL(url)
    }

    pdfWindow.close()

    if (error.response?.data instanceof Blob) {
      const text = await error.response.data.text()

      if (error.response.data.type.includes('json')) {
        const data = JSON.parse(text)
        throw new Error(data.message || data.error || error.message)
      }
    }

    throw error
  }
}
