import clsx from 'clsx';
import React from 'react';

import ErrorText from 'components/ErrorText';

type Props = {
  label: string;
  input: React.ReactNode;
  optional?: boolean;
  message?: string;
  formErrorClass?: string;
  formWrapperClass?: string;
  labelClass?: string;
  textWrapperClass?: string;
};

const FormInput = ({
  label,
  input,
  optional = false,
  message,
  formErrorClass,
  formWrapperClass,
  labelClass,
  textWrapperClass,
}: Props) => {
  return (
    <div
      className={clsx(
        'relative',
        formWrapperClass != null ? formWrapperClass : null,
      )}
    >
      <label
        className={clsx(
          'flex flex-col gap-1',
          labelClass != null ? labelClass : null,
        )}
      >
        <span
          className={clsx(
            textWrapperClass != null ? textWrapperClass : null,
            'inline-flex gap-1 text-sm font-medium text-slate-700',
          )}
        >
          {label}
          {optional ? <p className="text-slate-400">(Optional)</p> : null}
        </span>
        {input}
      </label>
      {message != null ? (
        <ErrorText text={message} className={formErrorClass} />
      ) : null}
    </div>
  );
};

export default FormInput;
