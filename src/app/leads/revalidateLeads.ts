'use server'

import { revalidateTag } from 'next/cache'

// After a form submission, require re-fetching leads to ensure the
// new lead is present
export default async function revalidateLeads() {
    revalidateTag('leads');
}