import React from 'react';
import { useField } from 'formik';

function Input({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className={'px-3 mb-6 md:mb-0 w-full'}>
            <label
                htmlFor={props.id || props.name}
                className="block uppercase tracking-wide text-gray-darker dark:text-white text-xs font-bold mb-2">
                {label}
            </label>
            <input
                className={`appearance-none block w-full bg-white dark:bg-gray-900 dark:text-gray-100 text-gray-darker border-none  rounded py-3 px-4 mb-3 ${
                    meta.error ? 'border-red-300' : 'border-gray-darker'
                }`}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="block uppercase text-xs text-red-400">{meta.error}</div>
            ) : null}
        </div>
    );
}
export default Input;
