import React, { useState } from 'react'
import { getBrowserVisibilityProp, getIsDocumentHidden } from './helpers'

export function usePageVisibility() {
    const [isVisible, setIsVisible] = useState(getIsDocumentHidden())
    const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())

    React.useEffect(() => {
        const visibilityChange = getBrowserVisibilityProp()

        document.addEventListener(visibilityChange, onVisibilityChange, false)

        return () => {
        document.removeEventListener(visibilityChange, onVisibilityChange)
        }
    })

    return isVisible
}