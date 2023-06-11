import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import Cookies from 'universal-cookie';
import { z } from 'zod';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { ROUTES } from 'Routes';
import { login, LoginUserResponse, sessionLogin } from 'services/authService';
import { isAxiosError } from 'utils/error';

const loginSchemaSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginForm = z.infer<typeof loginSchemaSchema>;

function Home() {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [renderLogin, setRenderLogin] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaSchema),
  });
  const { api } = login();
  const { mutateAsync } = useMutation(api, {
    onSuccess: (data) => {
      toast.promise(
        sessionLoginMutation(data),
        {
          loading: `Logging`,
          success: `Logged`,
          error: `Failed to login`,
        },
        {
          id: 'session_login',
        },
      );
    },
    onError: (err: Error | AxiosError<any>) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          // @ts-expect-error
          toast.error(err?.response?.data?.message, {
            id: 'error-sending-otp',
          });
        } else {
          toast.error(err?.message, {
            id: 'error-sending-otp-general',
          });
        }
      }
    },
  });
  const { mutateAsync: sessionLoginMutation } = useMutation(
    ['sessionLogin'],
    (data: LoginUserResponse) => sessionLogin(data),

    {
      onSuccess: () => {
        const cookies = new Cookies();
        cookies.set('hasToken', 'Yes');
        router.push(ROUTES.DASHBOARD.HOME);
      },
    },
  );
  const onSubmit = (data: LoginForm) => {
    toast.promise(
      mutateAsync(data),
      {
        loading: 'Checking Credentials',
        success: 'Credentials Verify successful!',
        error: 'Error! Credentials Verify Failed',
      },
      {
        id: 'login',
      },
    );
  };

  React.useEffect(() => {
    const cookies = new Cookies();
    let data = cookies.get('hasToken');
    if (data) {
      setIsLogin(true);
      router.push(ROUTES.DASHBOARD.HOME);
    }
    setRenderLogin(true);
  }, [router]);

  return (
    <>
      <section className="flex min-h-screen items-center justify-center">
        {!isLogin ? (
          <>
            {!renderLogin ? (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            ) : (
              <div className="min-w-[450px] space-y-6 rounded-lg bg-white p-6 text-center shadow-lg">
                <h1 className="text-2xl font-bold">Login</h1>
                <form
                  id="loginForm"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormInput
                    label="Email"
                    input={
                      <input
                        placeholder="Enter Email"
                        type="email"
                        {...register('email')}
                        className={clsx(
                          'input',
                          errors.email ? 'input-error' : null,
                        )}
                      />
                    }
                    message={errors.email?.message}
                  />
                  <FormInput
                    label="Password"
                    input={
                      <input
                        placeholder="Enter Password"
                        type="password"
                        {...register('password')}
                        className={clsx(
                          'input',
                          errors.password ? 'input-error' : null,
                        )}
                      />
                    }
                    message={errors.password?.message}
                  />
                  <Button form="loginForm" type="submit" variant="primary">
                    Login
                  </Button>
                </form>
              </div>
            )}
          </>
        ) : (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
      </section>
    </>
  );
}

export default Home;
