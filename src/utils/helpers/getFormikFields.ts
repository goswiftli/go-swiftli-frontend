import { FormikProps } from 'formik';

export const getFormikFields = <T extends Record<string, any>>(
  formik: FormikProps<T>,
  fieldName: keyof T
) => ({
  name: fieldName as string,
  id: fieldName as string,
  value: formik.values[fieldName],
  onChange: formik.handleChange,
  isInvalid: formik.touched[fieldName] && Boolean(formik.errors[fieldName]),
  errorMessage: formik.touched[fieldName] && formik.errors[fieldName],
});
