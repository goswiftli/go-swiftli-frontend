import { Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { FormInput } from '@/components';

import { useSetupProfilePatch } from '../../apis';

const validationSchema = yup.object().shape({
  occupation: yup.string().required().label('Date of birth'),
  companyName: yup.string().required().label('Company Name'),
  jobTitle: yup.string().required().label('Job Title'),
});

export const useBusinessDetails = () => {
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  const setupProfileMutation = useSetupProfilePatch();
  const isLoadingBusiness = setupProfileMutation.isPending;

  const formik = useFormik({
    initialValues: {
      occupation: '',
      companyName: '',
      jobTitle: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setupProfileMutation.mutate(values);
    },
  });

  const handleSubmitBusiness = () => {
    formik.handleSubmit();
  };
  const businessDetails = [
    {
      name: <Text as="span">Company Name</Text>,
      value: showBusinessForm ? (
        <FormInput
          placeholder="Enter company name"
          name="companyName"
          value={formik.values.companyName}
          isInvalid={formik.touched.companyName && Boolean(formik.errors.companyName)}
          onChange={formik.handleChange}
          errorMessage={formik.touched.companyName && formik.errors.companyName}
        />
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Occupation</Text>,
      value: showBusinessForm ? (
        <FormInput
          placeholder="Enter occupation"
          name="occupation"
          value={formik.values.occupation}
          isInvalid={formik.touched.occupation && Boolean(formik.errors.occupation)}
          onChange={formik.handleChange}
          errorMessage={formik.touched.occupation && formik.errors.occupation}
        />
      ) : (
        <Text as="span">Not Available</Text>
      ),
    },
    {
      name: <Text as="span">Job Title</Text>,
      value: showBusinessForm ? (
        <FormInput
          placeholder="Enter Job title"
          name="jobTitle"
          value={formik.values.jobTitle}
          isInvalid={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
          onChange={formik.handleChange}
          errorMessage={formik.touched.jobTitle && formik.errors.jobTitle}
        />
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
