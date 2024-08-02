'use client'
import { FC, useState } from "react";
import schema from './form/schema.json';
import uischema from './form/uischema.json';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { css } from "@emotion/css";
import isEmailValid from "../validation/isEmailValid";
import { ErrorObject } from 'ajv';
import { ValidationMode } from "@jsonforms/core";

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

const CaseSubmissionForm = ({
    message
}: {
    message: string,
}) => {
    const [data, setData] = useState<CaseSubmissionFormType>();
    const [validationMode, setValidationMode] = useState<ValidationMode>('ValidateAndHide');
    const [anyFormErrorsPresent, setAnyFormErrorsPresent] = useState<boolean>(false);
    const [additionalErrors, setAdditionalErrors] = useState<ErrorObject[]>([]);

    const onChange = ({ data, errors }: { data: CaseSubmissionFormType, errors: any[] }) => {
        console.log(data, errors);
        setData(data);
        setAnyFormErrorsPresent(!!errors.length);
    };

    const submit = async () => {
        console.log('submitting', data);

        const isEmailPresentAndValid: boolean = !data?.email || isEmailValid(data.email)
        if (!isEmailPresentAndValid) {
            setAdditionalErrors([
                {
                    dataPath: '/email',
                    message: 'Please submit a valid email address',
                    schemaPath: '',
                    keyword: '',
                    params: {},
                }
            ])
            setAnyFormErrorsPresent(true);
        }
        if (!isEmailPresentAndValid || anyFormErrorsPresent) {
            setValidationMode('ValidateAndShow');
        } else {
            const response = await fetch('/api/leads', {
                method: 'POST',
                body: JSON.stringify(data),
            })
            // submit form
        }
    }

    return (
        <div className={css`
            width: 70%;
            margin: auto;
        `}>
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                onChange={onChange}
                validationMode={validationMode}
                additionalErrors={additionalErrors}
            />
            <button name="Submit" onClick={submit}>Submit</button>
        </div>
    )

};

export default CaseSubmissionForm;