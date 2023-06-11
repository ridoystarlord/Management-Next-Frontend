import clsx from 'clsx';
import React from 'react';

const ErrorText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return <p className={clsx('error__text', className)}>{text}</p>;
};

export default ErrorText;
