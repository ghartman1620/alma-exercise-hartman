import { DOMAIN_NAME } from "@/domain"
import StoreProvider from "@/store/StoreProvider"
import Leads from "./components/leads"


async function getData(searchParams: { [key: string]: string | string[] | undefined } | undefined) {
    const res = await fetch(`${DOMAIN_NAME}/api/leads?auth=${searchParams?.auth ?? ''}`, { next: { tags: ['leads'] } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function LeadsPage({
    searchParams
}: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
    const data = await getData(searchParams)

    return <StoreProvider leads={data}>
        <Leads />
    </StoreProvider>
}