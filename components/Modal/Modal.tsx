import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment } from 'react';
type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ children, showModal, setShowModal }) => {
  const handleDismiss = () => setShowModal(false);
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={handleDismiss}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center bg-[#0F172AAD] p-4">
            <Transition.Child
              as={Fragment}
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
