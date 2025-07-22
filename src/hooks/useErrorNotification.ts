import { useEffect } from 'react';

import { useToast } from './useToast';

type ErrorProps = {
  isError: boolean;
  description: string;
  name: string;
};

export const useErrorNotification = ({ isError, description, name }: ErrorProps) => {
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        id: `toast-${name}`,
        status: 'error',
        description,
        duration: 2000,
      });
    }
  }, [description, isError, name, toast]);
};
