import type { NextApiRequest, NextApiResponse } from 'next'
import { MOCK_AUTH_TOKEN } from './login';

export default function handleLoginRequest(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const authToken = req.cookies.Authorization;
    if (authToken === MOCK_AUTH_TOKEN) {
        res
            .status(200)
            .send('Success');
    } else {
        res.status(403)
            .send("Invalid username or password");
    }
}