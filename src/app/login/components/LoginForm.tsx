'use client'
import { JsonForms } from "@jsonforms/react"
import schema from './login-form/schema.json';
import uischema from './login-form/uischema.json';
import { materialRenderers } from "@jsonforms/material-renderers";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { ErrorObject } from 'ajv';
import { css } from "@emotion/css";


const LoginForm = () => {
    const router = useRouter();
    const [data, setData] = useState({});
    const [additionalErrors, setAdditionalErrors] = useState<ErrorObject[]>([]);
    const submit = async () => {
        const loginResponse = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });


        if (loginResponse.ok) {
            const token = await loginResponse.text();
            console.log(token);
            router.push(`/leads?auth=${token}`);
        } else {
            setAdditionalErrors([
                {
                    dataPath: '/password',
                    message: 'Username or password invalid',
                    schemaPath: '',
                    keyword: '',
                    params: {},
                }
            ]);
        }
    }

    return (
        <div className={css`
            margin: auto;
            width: 60%;
        `}>
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                onChange={({ data }) => setData(data)}
            />
            <button name="Submit" onClick={submit}>Submit</button>
        </div>
    )
};

export default LoginForm;