import type { NextApiRequest, NextApiResponse } from 'next';


// Auth in this exercise will be simplified and for example only,
// using a hard-coded username, password, and auth token.
const MOCK_AUTH_USERNAME = 'admin';
const MOCK_AUTH_PASSWORD = 'alma';
export const MOCK_AUTH_TOKEN = 'abc123';
export default function handleLoginRequest(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { username, password } = JSON.parse(req.body);
    if (username === MOCK_AUTH_USERNAME && password === MOCK_AUTH_PASSWORD) {
        res
            .status(200)
            .send(MOCK_AUTH_TOKEN);
    } else {
        res.status(401)
            .send('Invalid username or password');
    }
}