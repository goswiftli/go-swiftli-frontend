import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Skeleton } from '@/components';
import { useGetUserDetails, UserInfo } from '@/features/admin-flow';
import { useAppSelector } from '@/redux';
import { dataURLtoBlob } from '@/utils';

import { useSetupProfile } from '../../apis';

import { useAccountInfo } from './AccountInfo';
import { useBusinessDetails } from './BusinessDetails';
import { usePersonalDetails } from './PersonalDetails';

export const Profile = () => {
  const { authUser } = useAppSelector((state) => state.auth);

  const { isPending, isError, data: user } = useGetUserDetails(authUser.id);

  const blob = dataURLtoBlob(user?.data?.kyc?.profilePicture ?? '');
  const objectUrl = URL.createObjectURL(blob);

  const userDetails = [
    {
      name: 'Email',
      value: user?.data.username,
    },
    {
      name: 'Phone number',
      value: user?.data.phoneNumber,
    },
    {
      name: 'Location',
      value: user?.data?.kyc?.idVerificationCountry ?? 'N/A',
    },
  ];

  const {
    handleSubmit,
    personalDetails,
    setShowForm,
    showForm,
    isLoadingProfile,
    formik: formikPersonal,
  } = usePersonalDetails();
  const {
    handleSubmitBusiness,
    businessDetails,
    setShowBusinessForm,
    showBusinessForm,
    formik: formikBusiness,
    isLoadingBusiness,
  } = useBusinessDetails();
  const { accountInfo } = useAccountInfo();
  const showPersonalDetailsForm = () => {
    setShowForm(true);
  };

  const showBusinessDetailsForm = () => {
    setShowBusinessForm(true);
  };

  const setupProfileMutation = useSetupProfile();

  const [showAllForm, setShowAllForm] = useState(false);
  const handleSubmitAll = async () => {
    showBusinessDetailsForm();
    showPersonalDetailsForm();
    setShowAllForm(true);
    formikPersonal.setTouched({
      dateOfBirth: true,
      gender: true,
      maritalStatus: true,
    });

    formikBusiness.setTouched({
      occupation: true,
      companyName: true,
      jobTitle: true,
    });

    const [personalValid, businessValid] = await Promise.all([
      formikPersonal.validateForm().then((errors) => Object.keys(errors).length === 0),
      formikBusiness.validateForm().then((errors) => Object.keys(errors).length === 0),
    ]);

    if (personalValid && businessValid) {
      setupProfileMutation.mutate({
        ...formikPersonal.values,
        ...formikBusiness.values,
      });
    }
  };

  return (
    <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} pb={12}>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={6}>
        <Box w={{ base: 'full', lg: '40%' }}>
          <Skeleton isLoading={isPending} isError={isError}>
            <Card>
              <CardBody as={Stack} p={4} spacing={4}>
                <Stack alignItems="center" w="full" spacing={4}>
                  <Avatar src={objectUrl} boxSize="120px" />
                  <Text fontFamily="body" color="black.800" fontSize="md">
                    {`${user?.data?.kyc?.firstName ?? 'N/A'} ${user?.data?.kyc?.lastName ?? 'N/A'}`}
                  </Text>
                  <Box rounded="4px" p={3} bgColor="blue.100" w="full">
                    <Text fontFamily="body" fontSize="sm" pb={2}>
                      Your profile is 25% complete
                    </Text>
                    <Progress
                      sx={{
                        '& > div': {
                          background: 'blue.300',
                          rounded: '10px',
                        },
                      }}
                      value={25}
                      backgroundColor="grey.300"
                      rounded="10px"
                    />
                  </Box>
                </Stack>

                {userDetails.map((user) => (
                  <Box key={user.name} pb={2}>
                    <Text fontFamily="inter" fontSize="md" color="black.300" fontWeight="light">
                      {user.name}
                    </Text>
                    <Text fontFamily="inter" fontSize="md" fontWeight="normal">
                      {user.value}
                    </Text>
                  </Box>
                ))}
              </CardBody>
            </Card>
          </Skeleton>
        </Box>

        <Stack flex={1} spacing={4}>
          <UserInfo
            headerName="Personal details"
            column={personalDetails}
            hasEditBtn={{ editBtnAction: showPersonalDetailsForm }}
            actionItem={
              showForm &&
              !showAllForm && (
                <HStack justifyContent="end">
                  <Button
                    w="30%"
                    rounded="8px"
                    variant="secondary"
                    size="sm"
                    display={showForm ? 'block' : 'false'}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    w="30%"
                    rounded="8px"
                    size="sm"
                    onClick={handleSubmit}
                    display={showForm ? 'block' : 'false'}
                    _hover={{ bgColor: 'primary.800' }}
                    isLoading={isLoadingProfile}
                  >
                    Save
                  </Button>
                </HStack>
              )
            }
          />
          <UserInfo
            headerName="Business details"
            column={businessDetails}
            hasEditBtn={{ editBtnAction: showBusinessDetailsForm }}
            actionItem={
              showBusinessForm &&
              !showAllForm && (
                <HStack justifyContent="end">
                  <Button
                    w="30%"
                    rounded="8px"
                    variant="secondary"
                    size="sm"
                    display={showBusinessForm ? 'block' : 'false'}
                    onClick={() => setShowBusinessForm(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    w="30%"
                    rounded="8px"
                    size="sm"
                    onClick={handleSubmitBusiness}
                    display={showBusinessForm ? 'block' : 'false'}
                    _hover={{ bgColor: 'primary.800' }}
                    isLoading={isLoadingBusiness}
                  >
                    Save
                  </Button>
                </HStack>
              )
            }
          />
          <UserInfo headerName="Account Information" column={accountInfo} />

          <Box pt={6}>
            <Button type="button" w="50%" onClick={handleSubmitAll}>
              Save
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
