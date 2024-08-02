import type { NextApiRequest, NextApiResponse } from 'next'
6
type ResponseData = {
    message: string
}

export default function handleLeadsRequest(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ message: 'Hello from Leads List Request Get!' })
}