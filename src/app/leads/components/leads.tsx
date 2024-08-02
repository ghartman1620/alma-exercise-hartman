'use client'
import { useAppSelector } from "@/store/hooks";
import { selectLeadsMessage } from "@/store/leadsSlice/leads.selectors";
import { css } from '@emotion/css'
import { FC } from "react";

const initialData = {
    name: 'Send email to Adrian',
    description: 'Confirm if you have passed the subject\nHereby ...',
    done: true,
    recurrence: 'Daily',
    rating: 3,
};

const Leads: FC = () => {
    const leadsMessage = useAppSelector(selectLeadsMessage);

    return <div className={css`
        margin: auto;
        text-align: center;
    `}>
        {leadsMessage}
    </div>;
}

export default Leads;