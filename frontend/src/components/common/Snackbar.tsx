import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const getToastStyle = (isSuccessful: boolean) => {
  return {
    style: {
      background: isSuccessful ? '#ecfdf5' : '#fef2f2',
      color: isSuccessful ? '#065f46' : '#991b1b',
    },
    icon: isSuccessful ? (
      <CheckCircleIcon className="h-5 w-5 text-green-800" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-red-800" />
    ),
  };
};

const Snackbar: React.FC = () => {
  useEffect(() => {
    const { style, icon } = getToastStyle(true);
    toast(
      (tToast) => (
        <span className="flex items-center gap-2">
          {icon}
          <span>Notification example</span>
          <button
            onClick={() => toast.dismiss(tToast.id)}
            className="ml-2 p-1 rounded hover:bg-gray-200 focus:outline-none"
          >
            <XMarkIcon className="h-4 w-4 text-gray-500" />
          </button>
        </span>
      ),
      {
        style,
        duration: 3000,
      },
    );
  }, []);

  return <Toaster position="bottom-right" />;
};

export default Snackbar;
