import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'white' | 'clear' | 'danger';
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseProps {}

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    BaseProps {}

const baseClass =
  'focus:outline-none rounded-md font-medium focus:ring-offset-2 inline-flex items-center focus:ring-2';
const primaryVariantClass =
  'text-white bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 shadow-sm disabled:bg-[#4D6D74] disabled:text-slate-300';
const secondaryVariantClass =
  'text-cyan-700 bg-cyan-50 hover:bg-cyan-100 hover:text-cyan-800 focus:bg-cyan-50  focus:text-cyan-800 focus:ring-cyan-700 shadow-sm disabled:bg-[#F4F7F7] disabled:text-cyan-900';
const whiteVariantClass =
  'bg-slate-50  text-slate-600 hover:bg-slate-100 hover:text-slate-700 focus:ring-slate-600 focus:text-slate-800 shadow disabled:bg-slate-50 disabled:text-slate-400';

const clearVariantClass =
  'text-cyan-500 hover:text-cyan-700 hover:font-bold focus:text-cyan-700 focus:ring-cyan-500 disabled:text-slate-500';

const dangerVariantClass =
  'bg-red-500  text-white hover:bg-red-600  focus:ring-red-600  shadow disabled:bg-red-50 disabled:text-slate-400';

export const useButtonClass = ({
  variant,
  size,
  className,
}: Omit<BaseProps, 'children'>) => {
  const buttonClass = clsx(
    baseClass,
    variant === 'primary' && primaryVariantClass,
    variant === 'secondary' && secondaryVariantClass,
    variant === 'white' && whiteVariantClass,
    variant === 'clear' && clearVariantClass,
    variant === 'danger' && dangerVariantClass,

    {
      'py-2 px-3 text-xs leading-4 xs': size === 'xs',
      'py-2.5 px-4 text-sm leading-4 sm': size === 'sm',
      'py-2.5 px-5 text-sm leading-5 base': size === 'base',
      'py-2.5 px-5 text-base leading-6 lg': size === 'lg',
      'py-3.5 px-7 text-base leading-6 xl': size === 'xl',
    },
    className,
  );
  return buttonClass;
};

const Button = ({
  type,
  children,
  size = 'base',
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) => {
  const buttonClass = useButtonClass({ variant, size, className });
  const mergedClass = twMerge(className, buttonClass);
  return (
    <button type={type} className={mergedClass} {...rest}>
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  size = 'base',
  variant = 'primary',
  className,
  ...rest
}: LinkButtonProps) => {
  const linkClass = useButtonClass({ variant, size, className });
  return (
    <a className={linkClass} {...rest}>
      {children}
    </a>
  );
};

export default Button;
