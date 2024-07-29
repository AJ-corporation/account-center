function onMessage(e) {
  if (e.data.action === 'requestLocalStorage') {
    const localData = JSON.parse(localStorage.getItem('aj-accounts'))
    e.source.postMessage(JSON.stringify(localData), e.origin)
  }
}

window.addEventListener('message', onMessage)
