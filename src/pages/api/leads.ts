import type { NextApiRequest, NextApiResponse } from 'next'


enum LeadStatus {
    PENDING = 'PENDING',
    REACHED_OUT = 'REACHED_OUT',
};

interface CaseSubmissionFormType {
    firstName: string,
    lastName: string,
    email: string,
    linkedInLink: string,
    visaTypes: string[],
    helpInformation: string,
    status: LeadStatus
};


// An in-memory object to simulate a database for the exercise. 
const leadsMockDatabase: CaseSubmissionFormType[] = [
    {
        firstName: "Jorge",
        lastName: "Ruiz",
        email: "jorge.ruiz@gmail.com",
        linkedInLink: "https://www.linkedin.com/in/gabriel-hartman-8b91b3172/",
        visaTypes: ["O-1"],
        helpInformation: "My name is Jorge and I'm seeking assistance renewing my visa",
        status: LeadStatus.PENDING,
    }
]

const handleLeadSubmission = (
    req: NextApiRequest,
    res: NextApiResponse<string>
) => {
    // Note: It's important to also perform input validation here (valid linkedin link, valid visa types, valid email)
    // because the client can disable the JS validations or otherwise submit an invalid request to our API. 
    // I've not done this yet in the interest of time.
    const leadFormSubmission = JSON.parse(req.body);
    leadsMockDatabase.push({
        ...leadFormSubmission,
        status: LeadStatus.PENDING,
    });
    res.status(200).send('success');
};

const handleLeadGet = (
    res: NextApiResponse<CaseSubmissionFormType[]>
) => {
    res.status(200).json(leadsMockDatabase);
}
export default function handleLeadsRequest(
    req: NextApiRequest,
    res: NextApiResponse<CaseSubmissionFormType[] | string>
) {
    if (req.method === 'POST') {
        handleLeadSubmission(req, res);
    } else {
        handleLeadGet(res);
    }
}