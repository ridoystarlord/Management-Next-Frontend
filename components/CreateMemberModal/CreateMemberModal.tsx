import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import Button from 'components/Button/Button';
import FormInput from 'components/FormInput/FormInput';
import { AddNewMember } from 'services/users';
import { isAxiosError } from 'utils/error';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
};

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password required'),
  phone: z.string().min(1, 'Phone is required'),
  role: z.string().min(1, 'Role is required'),
});
export type MemberForm = z.infer<typeof schema>;
const CreateMemberModal = ({ setShowModal, token }: Props) => {
  const queryClient = useQueryClient();
  const handleClose = () => {
    setShowModal(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberForm>({
    resolver: zodResolver(schema),
  });

  const { api } = AddNewMember({ token });
  const { mutateAsync } = useMutation(api, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      handleClose();
    },
    onError: (err: Error | AxiosError<any>) => {
      if (isAxiosError(err)) {
        //@ts-expect-error
        toast.error(err.response?.data?.message, {
          id: 'error-creating-member',
        });
      }
    },
  });

  const onSubmit = (data: MemberForm) => {
    toast.promise(
      mutateAsync(data),
      {
        loading: 'Creating Member',
        success: 'Member Created successful!',
        error: `Error!!! Creating Member`,
      },
      {
        id: 'create-member',
      },
    );
  };

  return (
    <div className="text-black">
      <div className="w-[450px] rounded bg-white p-6">
        <div className="grid grid-cols-1 gap-6">
          <h1 className="text-2xl font-semibold">Create New Member</h1>
          <form
            id="codeForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <FormInput
              label="Name"
              input={
                <input
                  placeholder="Enter Name"
                  type="text"
                  {...register('name')}
                  className={clsx('input', errors.name ? 'input-error' : null)}
                />
              }
              message={errors.name?.message}
            />

            <FormInput
              label="Email"
              input={
                <input
                  min={0}
                  type="email"
                  placeholder="Enter Email"
                  {...register('email')}
                  className={clsx('input', errors.email ? 'input-error' : null)}
                />
              }
              message={errors.email?.message}
            />
            <FormInput
              label="Password"
              input={
                <input
                  min={0}
                  type="password"
                  placeholder="Enter Password"
                  {...register('password')}
                  className={clsx(
                    'input',
                    errors.password ? 'input-error' : null,
                  )}
                />
              }
              message={errors.password?.message}
            />
            <FormInput
              label="Phone"
              input={
                <input
                  min={0}
                  type="text"
                  placeholder="Enter Phone"
                  {...register('phone')}
                  className={clsx('input', errors.phone ? 'input-error' : null)}
                />
              }
              message={errors.phone?.message}
            />
            <FormInput
              label="Select Member Type"
              input={
                <select {...register('role')} className="input">
                  <option value="">Select</option>
                  {['ADMIN', 'USER']?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              }
              message={errors.role?.message}
            />

            <div className="flex items-center justify-end gap-3">
              <Button form="codeForm" type="submit" variant="primary">
                Create New
              </Button>
              <Button type="button" variant="primary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMemberModal;
