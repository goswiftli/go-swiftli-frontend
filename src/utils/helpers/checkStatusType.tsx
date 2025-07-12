import { Tag, TagLabel } from '@chakra-ui/react';

import { CONSTANTS } from '@/constants';

type StatusType =
  | CONSTANTS.PENDING
  | CONSTANTS.APPROVED
  | CONSTANTS.REJECTED
  | CONSTANTS.SUSPENDED
  | CONSTANTS.ACTIVE
  | CONSTANTS.SUCCESSFUL
  | CONSTANTS.FAILED
  | CONSTANTS.REFUNDED
  | CONSTANTS.BLACKLISTED
  | CONSTANTS.DECLINED;
export const checkStatusType = (status: StatusType) => {
  const statusColors = {
    [CONSTANTS.PENDING]: {
      bgColor: 'warning.300',
      text: 'Pending',
    },
    [CONSTANTS.APPROVED]: {
      bgColor: 'success.200',
      text: 'Approved',
    },
    [CONSTANTS.REJECTED]: {
      bgColor: 'error.200',
      text: 'Rejected',
    },
    [CONSTANTS.SUSPENDED]: {
      bgColor: 'warning.300',
      text: 'Suspended',
    },
    [CONSTANTS.ACTIVE]: {
      bgColor: 'success.200',
      text: 'Active',
    },
    [CONSTANTS.SUCCESSFUL]: {
      bgColor: 'success.200',
      text: 'Successful',
    },
    [CONSTANTS.FAILED]: {
      bgColor: 'error.200',
      text: 'Failed',
    },
    [CONSTANTS.REFUNDED]: {
      bgColor: 'primary.150',
      text: 'Refunded',
    },
    [CONSTANTS.BLACKLISTED]: {
      bgColor: 'error.200',
      text: 'Blacklisted',
    },
    [CONSTANTS.DECLINED]: {
      bgColor: 'error.200',
      text: 'Failed',
    },
  };

  const { bgColor, text } = statusColors[status] || {
    bgColor: 'grey.100',
    text: 'Unknown',
  };

  return (
    <Tag bgColor={bgColor} justifyContent="center" rounded="16px" px={3} py={1} w="100px">
      <TagLabel fontFamily="body" fontWeight="normal" color="#000000" fontSize="md">
        {text}
      </TagLabel>
    </Tag>
  );
};
