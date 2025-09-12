import { CONSTANTS } from '@/constants';
import { useToast } from '@/hooks';
import { MutationConfig, queryClient, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { KycDTO, KycInfo } from '../../types';
import { queryKey, url } from '../url-query';

export const setupKyc = async (data: KycDTO) => {
  try {
    const formData = new FormData();

    formData.append('profilePicture', data.profilePicture);
    formData.append('idFile', data.idVerification.fileDetails.file);

    const kycData: KycInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      comment: data.comment as string,
      idVerificationCountry: data.idVerification.country,
      idVerificationType: data.idVerification.fileDetails.type,
      kycStatus: CONSTANTS.PENDING,
    };

    formData.append('kycDataJson', JSON.stringify(kycData));
    const response = await axios.post<ApiResponse<KycDTO>>(url.kycSetup, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseSetupKycOptions = {
  config?: MutationConfig<typeof setupKyc>;
};

export const useSetupKyc = ({ config }: UseSetupKycOptions = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'kyc-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getKyc(), res.data.email],
        exact: false,
      });
    },
    mutationFn: setupKyc,
    ...config,
  });
};
