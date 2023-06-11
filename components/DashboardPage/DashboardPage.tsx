import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import Button from 'components/Button/Button';
import CreateMemberModal from 'components/CreateMemberModal/CreateMemberModal';
import Modal from 'components/Modal/Modal';
import UsersTable from 'components/UsersTable/UsersTable';
import useUserHook from 'hooks/use-user.hook';
import { ROUTES } from 'Routes';
import { getAllMemberList } from 'services/users';

type Props = {
  token: string;
};
const DashboardPage = ({ token }: Props) => {
  // ** Local State ** //
  const [showModal, setShowModal] = React.useState(false);
  const [pageInput, setPageInput] = React.useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(
    undefined,
  );
  const [orderId, setOrderId] = React.useState<string | undefined>(undefined);
  const [searchName, setSearchName] = React.useState<string | undefined>(
    undefined,
  );
  const [status, setStatus] = React.useState<string>('All');
  const [sizeInput, setSizeInput] = React.useState<string>('10');
  const [timerId, setTimerId] = React.useState<null | NodeJS.Timeout>(null);
  // ** Local State ** //

  // **  Query ** //
  const router = useRouter();
  const { page, size, mobileNumber, orderNo, orderStatus, name } =
    router.query as Record<string, string | undefined>;
  const serverQuery = {
    page,
    size,
    name,
    mobileNumber,
    orderNo,
    orderStatus,
  };

  const debouncedUpdateQuery = (
    newQuery: Record<string, string | undefined>,
  ) => {
    if (timerId != null) {
      clearTimeout(timerId);
    }

    const updateQuery = () => {
      let { page, size, mobileNumber, orderNo, orderStatus, name } =
        router.query;

      router.push(
        {
          pathname: ROUTES.DASHBOARD.HOME,
          query: {
            page,
            size,
            ...newQuery,
          },
        },
        undefined,
        { shallow: true },
      );
    };
    const id = setTimeout(updateQuery, 300);
    setTimerId(id);
  };

  const handleMobileNumberSearch = () => {
    debouncedUpdateQuery({ mobileNumber: phoneNumber });
  };
  const handleNameSearch = () => {
    debouncedUpdateQuery({ name: searchName });
  };
  const handleOrderNoSearch = () => {
    debouncedUpdateQuery({ orderNo: orderId });
  };
  const handleClearSearch = () => {
    setPhoneNumber(undefined);
    setSearchName(undefined);
    setOrderId(undefined);
    debouncedUpdateQuery({
      orderNo: undefined,
      mobileNumber: undefined,
      orderStatus: '',
    });
  };

  const handlePageInput = (input: string) => {
    setPageInput(input);
    debouncedUpdateQuery({ page: input });
  };
  const handleSizeInput = (input: string) => {
    setSizeInput(input);
    debouncedUpdateQuery({ size: input });
  };

  // **  Data Fetching ** //
  const { api, getKey } = getAllMemberList({ token, ...serverQuery });
  const { data } = useQuery(getKey(), api, {
    keepPreviousData: true,
  });
  // **  Data Fetching ** //

  const { data: localData } = useUserHook();

  return (
    <>
      {localData?.role === 'SUPER ADMIN' && (
        <div className="rounded bg-white p-3 text-black shadow">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Button
                type="button"
                variant="primary"
                onClick={() => setShowModal(true)}
              >
                Create New Member
              </Button>
            </div>
          </div>
        </div>
      )}
      {localData?.role !== 'USER' ? (
        <section className="mt-3 rounded shadow">
          {data != null ? (
            <UsersTable memberListResponse={data} token={token} />
          ) : null}
        </section>
      ) : (
        <div>User View Coming Soon</div>
      )}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <CreateMemberModal setShowModal={setShowModal} token={token} />
      </Modal>
    </>
  );
};

export default DashboardPage;
