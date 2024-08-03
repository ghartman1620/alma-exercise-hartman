'use client'
import { useAppSelector } from "@/store/hooks";
import { selectLeads } from "@/store/leadsSlice/leads.selectors";
import { Lead } from "@/store/leadsSlice/leads.slice";
import { css } from '@emotion/css'


const Leads = () => {
    const leadsList: Lead[] = useAppSelector(selectLeads);

    return <div className={css`
        margin: auto;
        width: 60%
    `}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>LinkedIn link</th>
                    <th>Interested Visa Types</th>
                    <th>Help Request </th>
                    <th>Current Status</th>
                </tr>
            </thead>
            <tbody>
                {leadsList?.map(({ firstName, lastName, email, linkedInLink, visaTypes, helpInformation, status }, i) => (
                    <tr key={i}>
                        <td>{`${firstName} ${lastName}`}</td>
                        <td>{email}</td>
                        <td>{linkedInLink}</td>
                        <td>{visaTypes.join(' ')}</td>
                        <td>{helpInformation}</td>
                        <td>{status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default Leads;