import { dehydrate } from '@tanstack/react-query';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';

import AppLayout from 'components/AppLayout';
import DashboardPage from 'components/DashboardPage/DashboardPage';
import { ROUTES } from 'Routes';
import { getAllMemberList } from 'services/users';
import { defaultQueryClient } from 'services/util';
import { withSessionSsr } from 'utils/session';

interface Props
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const DashboardMainPage = ({ token }: Props) => {
  return <DashboardPage token={token} />;
};
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const queryClient = defaultQueryClient;

    const { token } = req.session;
    if (token == null) {
      return {
        redirect: {
          destination: `${ROUTES.HOME}?redirect=${ROUTES.DASHBOARD.HOME}`,
          permanent: false,
        },
        props: {
          token,
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
    const { page, size } = query as Record<string, string | undefined>;

    const serverQuery = {
      page,
      size,
    };

    const { getKey, api } = getAllMemberList({ token, ...serverQuery });

    try {
      await queryClient.prefetchQuery(getKey(), api);
    } catch (error) {
      console.error(error);
    }

    return {
      props: {
        token,
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
);
DashboardMainPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout title="Dashboard">{page}</AppLayout>;
};
export default DashboardMainPage;
