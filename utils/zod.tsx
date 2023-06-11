import * as z from 'zod';

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'string') {
      return { message: 'Please input a valid value!' };
    }
    if (issue.expected === 'number') {
      return { message: 'Please input a valid value!' };
    }
  }
  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return { message: 'Please input a valid value!' };
  }

  return { message: ctx.defaultError };
};
