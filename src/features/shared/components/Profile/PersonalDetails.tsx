import { Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { FormInput, FormSelect, Skeleton } from '@/components';

import { useGetProfile, useSetupProfilePatch } from '../../apis';

const validationSchema = yup.object().shape({
  dateOfBirth: yup.string().required().label('Date of birth'),
  gender: yup.string().required().label('Gender'),
  maritalStatus: yup.string().required().label('Marital Status'),
});

export const usePersonalDetails = () => {
  const [showForm, setShowForm] = useState(false);

  const { isPending, isError, data: profile } = useGetProfile();

  const setupProfileMutation = useSetupProfilePatch();
  const isLoadingProfile = setupProfileMutation.isPending;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dateOfBirth: profile?.data.dateOfBirth ?? '',
      gender: profile?.data.gender ?? '',
      maritalStatus: profile?.data.maritalStatus ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setShowForm(false);
      // setupProfileMutation.mutate(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  const personalDetails = [
    {
      name: <Text as="span">Date of birth</Text>,
      value: showForm ? (
        <Skeleton isLoading={isPending} isError={isError}>
          <FormInput
            placeholder="Enter date of birth"
            name="dateOfBirth"
            type="date"
            value={formik.values.dateOfBirth}
            isInvalid={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            onChange={formik.handleChange}
            errorMessage={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        </Skeleton>
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Gender</Text>,
      value: showForm ? (
        <Skeleton isLoading={isPending} isError={isError}>
          <FormSelect
            options={optionsGender}
            placeholder="Select Gender"
            name="gender"
            value={formik.values.gender}
            isInvalid={formik.touched.gender && Boolean(formik.errors.gender)}
            onChange={formik.handleChange}
            errorMessage={formik.touched.gender && formik.errors.gender}
          />
        </Skeleton>
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Marital</Text>,
      value: showForm ? (
        <Skeleton isLoading={isPending} isError={isError}>
          <FormSelect
            options={optionsMarital}
            placeholder="Select marital status"
            name="maritalStatus"
            value={formik.values.maritalStatus}
            isInvalid={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
            onChange={formik.handleChange}
            errorMessage={formik.touched.maritalStatus && formik.errors.maritalStatus}
          />
        </Skeleton>
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
  ];

  return { personalDetails, handleSubmit, setShowForm, showForm, isLoadingProfile, formik };
};

const optionsGender = [
  {
    label: 'Male',
    value: 'MALE',
  },
  {
    label: 'Female',
    value: 'FEMALE',
  },
];
const optionsMarital = [
  {
    label: 'Single',
    value: 'SINGLE',
  },
  {
    label: 'Married',
    value: 'MARRIED',
  },
];
