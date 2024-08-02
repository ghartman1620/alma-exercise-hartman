'use client'
import { useAppSelector } from "@/store/hooks";
import { selectLeadsMessage } from "@/store/leadsSlice/leads.selectors";
import { css } from '@emotion/css'


export default function Leads() {
    const leadsMessage = useAppSelector(selectLeadsMessage);

    return <div className={css`
        margin: auto;
        text-align: center;
    `}>
        {leadsMessage}
    </div>;
}