import { useEffect } from 'react'

import { loadFromLocalStorage } from '../../js/db/local/localStorage'

export default function SendLocalStoragePage() {
  useEffect(() => {
    function onMessage(e) {
      if (e.data.action === 'requestLocalStorage') {
        const localData = loadFromLocalStorage('aj-accounts')
        e.source.postMessage(JSON.stringify(localData), e.origin)
      }
    }

    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [])

  return null
}
