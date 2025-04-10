import { Avatar, Box, Card, CardBody, Progress, Stack, Text } from '@chakra-ui/react';

import userImg from '@/assets/images/user1.png';

import { UserInfo } from './UserInfo';

export const UserDetails = () => {
  const userDetails = [
    {
      name: 'Email',
      value: 'olagbemiifeoluwa@gmail.com',
    },
    {
      name: 'Phone number',
      value: '08074838292',
    },
    {
      name: 'Location',
      value: 'Abuja, Nigeria',
    },
  ];
  return (
    <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} pb={12}>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={6}>
        <Box w={{ base: 'full', lg: '40%' }}>
          <Card>
            <CardBody as={Stack} p={4} spacing={4}>
              <Stack alignItems="center" w="full" spacing={4}>
                <Avatar src={userImg} boxSize="120px" />
                <Text fontFamily="body" color="black.800" fontSize="md">
                  Obe Badmus
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
        </Box>

        <Stack flex={1} spacing={4}>
          <UserInfo headerName="Personal details" column={personalDetails} />
          <UserInfo headerName="Business details" column={businessDetails} />
          <UserInfo headerName="Social media profile" column={socialMedia} />
          <UserInfo headerName="Account Information" column={accountInfo} />
          <UserInfo headerName="KYC Details" column={kycDetails} />
        </Stack>
      </Stack>
    </Box>
  );
};
const personalDetails = [
  {
    name: 'Date of birth',
    value: '16th June, 1967',
  },
  {
    name: 'Gender',
    value: 'Male',
  },
  {
    name: 'Marital status',
    value: 'Married',
  },
];

const businessDetails = [
  {
    name: 'Occupation',
    value: 'Civil Engineer',
  },
  {
    name: 'Company name',
    value: 'Julius Berger',
  },
  {
    name: 'Job Title',
    value: 'Construction Engineer',
  },
];

const socialMedia = [
  {
    name: 'Facebook',
    value: 'facebook.com',
  },
  {
    name: 'Instagram',
    value: 'instagram.com',
  },
];

const accountInfo = [
  {
    name: 'Joined',
    value: 'March, 2024',
  },
  {
    name: 'Account Email',
    value: 'olagbemiifeoluwa@gmail.com',
  },
  {
    name: 'Personal KYC status',
    value: 'Approved',
  },
];

const kycDetails = [
  {
    name: 'Location preference',
    value: 'Lagos',
  },
  {
    name: 'Type of property',
    value: 'Bungalow',
  },
  {
    name: 'Preferred amenities',
    value: 'wifi, garage',
  },
];
