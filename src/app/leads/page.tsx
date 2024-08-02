import { DOMAIN_NAME } from "@/domain"
import StoreProvider from "@/store/StoreProvider"
import Leads from "./components/leads"


async function getData() {
    const res = await fetch(`${DOMAIN_NAME}/api/leads`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function LeadsPage() {
    const data = await getData()

    return <StoreProvider message={JSON.stringify(data)} >
        <Leads />
    </StoreProvider>
}