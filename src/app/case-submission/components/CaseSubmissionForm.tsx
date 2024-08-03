'use client';
import { useState } from 'react';
import schema from './case-submission-form/schema.json';
import uischema from './case-submission-form/uischema.json';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { css } from '@emotion/css';
import isEmailValid from '../validation/isEmailValid';
import { ErrorObject } from 'ajv';
import { ValidationMode } from '@jsonforms/core';
import revalidateLeads from '@/app/leads/revalidateLeads';
import { useRouter } from 'next/navigation';

interface CaseSubmissionFormType {
    firstName: string,
    lastName: string,
    email: string,
    linkedInLink: string,
    visaTypes: string[],
    helpInformation: string,
};

const initialData: CaseSubmissionFormType = {
    firstName: '',
    lastName: '',
    email: '',
    linkedInLink: '',
    visaTypes: [],
    helpInformation: '',
};

const CaseSubmissionForm = () => {
    const router = useRouter();
    const [data, setData] = useState<CaseSubmissionFormType>();
    const [validationMode, setValidationMode] = useState<ValidationMode>('ValidateAndHide');
    const [anyFormErrorsPresent, setAnyFormErrorsPresent] = useState<boolean>(false);
    const [additionalErrors, setAdditionalErrors] = useState<ErrorObject[]>([]);
    const [loading, setIsLoading] = useState(false);

    const onChange = ({ data, errors }: { data: CaseSubmissionFormType, errors: any[] }) => {
        setData(data);
        setAnyFormErrorsPresent(!!errors.length);
    };

    const submit = async () => {

        const isEmailPresentAndValid: boolean = !data?.email || isEmailValid(data.email);
        if (!isEmailPresentAndValid) {
            setAdditionalErrors([
                {
                    dataPath: '/email',
                    message: 'Please submit a valid email address',
                    schemaPath: '',
                    keyword: '',
                    params: {},
                }
            ]);
            setAnyFormErrorsPresent(true);
        }
        if (!isEmailPresentAndValid || anyFormErrorsPresent) {
            setValidationMode('ValidateAndShow');
        } else {
            setIsLoading(true);
            const response = await fetch('/api/leads', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (response.ok) {
                revalidateLeads();
                router.push('/thank-you');
            }
            setIsLoading(false);
        }
    };

    return (
        <div className={css`
            width: 60%;
            margin: auto;
        `}>
            <h2>Get an Assessment of your Immigration Case</h2>
            <JsonForms
                readonly={loading}
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                onChange={onChange}
                validationMode={validationMode}
                additionalErrors={additionalErrors}
            />
            <button name="Submit" disabled={loading} onClick={submit}>Submit</button>
        </div>
    );

};

export default CaseSubmissionForm;