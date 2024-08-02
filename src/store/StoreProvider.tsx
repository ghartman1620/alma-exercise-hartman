'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { setMessage } from './leadsSlice/leads.slice'

export default function StoreProvider({
    message,
    children
}: {
    message: string,
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        storeRef.current.dispatch(setMessage(message))
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}