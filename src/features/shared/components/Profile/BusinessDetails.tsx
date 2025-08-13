import { Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { FormInput, Skeleton } from '@/components';

import { useGetProfile, useSetupProfilePatch } from '../../apis';

const validationSchema = yup.object().shape({
  occupation: yup.string().required().label('Occupation'),
  companyName: yup.string().required().label('Company Name'),
  jobTitle: yup.string().required().label('Job Title'),
});

export const useBusinessDetails = () => {
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  const { isPending, isError, data: profile } = useGetProfile();

  const setupProfileMutation = useSetupProfilePatch();
  const isLoadingBusiness = setupProfileMutation.isPending;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      occupation: profile?.data.occupation ?? '',
      companyName: profile?.data.companyName ?? '',
      jobTitle: profile?.data.jobTitle ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // setupProfileMutation.mutate(values);
      setShowBusinessForm(false);
    },
  });

  const handleSubmitBusiness = () => {
    formik.handleSubmit();
  };
  const businessDetails = [
    {
      name: <Text as="span">Company Name</Text>,
      value: showBusinessForm ? (
        <Skeleton isLoading={isPending} isError={isError}>
          <FormInput
            placeholder="Enter company name"
            name="companyName"
            value={formik.values.companyName}
            isInvalid={formik.touched.companyName && Boolean(formik.errors.companyName)}
            onChange={formik.handleChange}
            errorMessage={formik.touched.companyName && formik.errors.companyName}
          />
        </Skeleton>
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Occupation</Text>,
      value: showBusinessForm ? (
        <Skeleton isLoading={isPending} isError={isError}>
          <FormInput
            placeholder="Enter occupation"
            name="occupation"
            value={formik.values.occupation}
            isInvalid={formik.touched.occupation && Boolean(formik.errors.occupation)}
            onChange={formik.handleChange}
            errorMessage={formik.touched.occupation && formik.errors.occupation}
          />
        </Skeleton>
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Job Title</Text>,
      value: showBusinessForm ? (
        <Skeleton isLoading={isPending} isError={isError}>
          <FormInput
            placeholder="Enter Job title"
            name="jobTitle"
            value={formik.values.jobTitle}
            isInvalid={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            onChange={formik.handleChange}
            errorMessage={formik.touched.jobTitle && formik.errors.jobTitle}
          />
        </Skeleton>
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
  ];

  return {
    businessDetails,
    handleSubmitBusiness,
    setShowBusinessForm,
    showBusinessForm,
    formik,
    isLoadingBusiness,
  };
};
