function onMessage(e) {
  if (e.data.action === 'requestLocalStorage') {
    const localData = JSON.parse(localStorage.getItem('aj-accounts'))
    console.log(localData)
    e.source.postMessage(
      {
        data: localData,
      },
      e.origin
    )
  }
}

window.addEventListener('message', onMessage)
