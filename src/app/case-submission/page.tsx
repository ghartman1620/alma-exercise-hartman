import { DOMAIN_NAME } from "@/domain"

async function getData() {
    const res = await fetch(`${DOMAIN_NAME}/api/hello`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function CaseSubmissionPage() {
    const data = await getData()

    return data.message
}