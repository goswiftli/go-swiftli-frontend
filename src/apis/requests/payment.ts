import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse, PaymentRequestDTO, PaymentResponseDTO } from '@/types';
import { formatError } from '@/utils';

import { url } from '../url-query';

export const makePayment = async (data: PaymentRequestDTO) => {
  try {
    const response = await axios.post<ApiResponse<PaymentResponseDTO>>(url.payment, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type useMakePaymentOptions = {
  config?: MutationConfig<typeof makePayment>;
};

export const useMakePayment = ({ config }: useMakePaymentOptions = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'payment-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    mutationFn: makePayment,
    ...config,
  });
};
