'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { Lead, setLeads } from './leadsSlice/leads.slice';

export default function StoreProvider({
    leads,
    children
}: {
    leads: Lead[],
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        storeRef.current.dispatch(setLeads(leads));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}