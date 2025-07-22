import { Button, Stack, useDisclosure } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ApproveKyc, useApproveKyc } from '@/features/user-flow';

import { FormTextarea } from '../Form';
import { Modal } from '../Modal';

const validationSchema = yup.object().shape({
  comment: yup.string().required().label('Comment'),
});

type RejectRequestProps = {
  userId: number;
};

export const RejectRequest = ({ userId }: RejectRequestProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const approveKycMutation = useApproveKyc();

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const rejectRequestBody: ApproveKyc = {
        userId,
        approved: false,
        comment: values.comment,
      };
      approveKycMutation.mutate(rejectRequestBody, {
        onSuccess() {
          onClose();
        },
      });
    },
  });
  return (
    <Modal
      id="reject-request"
      isOpen={isOpen}
      onClose={onClose}
      styles={{ w: { base: 'full', lg: '50%', xl: '40%' } }}
      trigger={
        <Button w="full" variant="error-button" onClick={onOpen} rounded="8px">
          Reject
        </Button>
      }
      body={
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Stack spacing={6}>
            <FormTextarea
              label="Comment"
              placeholder="Enter comment"
              name="comment"
              value={formik.values.comment}
              isInvalid={formik.touched.comment && Boolean(formik.errors.comment)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.comment && formik.errors.comment}
            />
            <Button variant="error-button" type="submit" rounded="8px" w="30%">
              Reject Request
            </Button>
          </Stack>
        </form>
      }
    />
  );
};
