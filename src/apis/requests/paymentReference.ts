import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse, PaymentResponseDTO } from '@/types';
import { formatError } from '@/utils';

import { url } from '../url-query';

export const getPaymentReference = async (reference: string) => {
  try {
    const response = await axios.post<ApiResponse<PaymentResponseDTO>>(
      `${url.paymentReference}/${reference}`
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type useGetPaymentReferenceOptions = {
  config?: MutationConfig<typeof getPaymentReference>;
};

export const useGetPaymentReference = ({ config }: useGetPaymentReferenceOptions = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'payment-ref-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess(res) {
      toast({
        id: 'payment-ref-toast-error',
        status: 'success',
        description: res.message,
      });
    },
    mutationFn: getPaymentReference,
    ...config,
  });
};
