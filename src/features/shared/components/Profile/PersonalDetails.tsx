import { Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { FormInput } from '@/components';

import { useSetupProfilePatch } from '../../apis';

const validationSchema = yup.object().shape({
  dateOfBirth: yup.string().required().label('Date of birth'),
  gender: yup.string().required().label('Gender'),
  maritalStatus: yup.string().required().label('Marital Status'),
});

export const usePersonalDetails = () => {
  const [showForm, setShowForm] = useState(false);

  const setupProfileMutation = useSetupProfilePatch();
  const isLoadingProfile = setupProfileMutation.isPending;

  const formik = useFormik({
    initialValues: {
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setupProfileMutation.mutate(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  const personalDetails = [
    {
      name: <Text as="span">Date of birth</Text>,
      value: showForm ? (
        <FormInput
          placeholder="Enter date of birth"
          name="dateOfBirth"
          type="date"
          value={formik.values.dateOfBirth}
          isInvalid={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
          onChange={formik.handleChange}
          errorMessage={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
        />
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Gender</Text>,
      value: showForm ? (
        <FormInput
          placeholder="Enter Gender"
          name="gender"
          value={formik.values.gender}
          isInvalid={formik.touched.gender && Boolean(formik.errors.gender)}
          onChange={formik.handleChange}
          errorMessage={formik.touched.gender && formik.errors.gender}
        />
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Marital</Text>,
      value: showForm ? (
        <FormInput
          placeholder="Enter marital status"
          name="maritalStatus"
          value={formik.values.maritalStatus}
          isInvalid={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
          onChange={formik.handleChange}
          errorMessage={formik.touched.maritalStatus && formik.errors.maritalStatus}
        />
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
  ];

  return { personalDetails, handleSubmit, setShowForm, showForm, isLoadingProfile, formik };
};
