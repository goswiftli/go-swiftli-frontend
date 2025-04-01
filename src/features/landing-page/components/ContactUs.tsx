import { Box, Button, Center, HStack, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import * as yup from 'yup';

import contactImg1 from '@/assets/images/contact1.jpg';
import contactImg2 from '@/assets/images/contact2.jpg';
import { Form, FormInput, FormTextarea } from '@/components';

export const ContactUs = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email'),
    number: yup.string().required().label('Phone number'),
    message: yup.string().required().label('Message'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      number: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} py="8em">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={10}
          w="full"
          justifyContent="space-around"
        >
          <Stack>
            <Box pb={10}>
              <Text
                fontFamily="body"
                fontWeight="medium"
                fontSize={{ base: '5xl', lg: '6xl', xl: '3rem' }}
              >
                Contact Us
              </Text>
              <Text fontFamily="body" fontWeight="normal" fontSize="md">
                We'd love to hear from you! Have a question or feedback? Reach out to us!
              </Text>
            </Box>
            <Form onSubmit={formik.handleSubmit}>
              <Stack spacing={8} order={{ base: 2, lg: 1 }}>
                <FormInput
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.name && formik.errors.name}
                />
                <HStack spacing={4}>
                  <FormInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.email && formik.errors.email}
                  />
                  <FormInput
                    label="Phone Number"
                    name="number"
                    placeholder="Enter your phone number"
                    value={formik.values.number}
                    isInvalid={formik.touched.number && Boolean(formik.errors.number)}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.number && formik.errors.number}
                  />
                </HStack>
                <FormTextarea
                  label="Message"
                  name="message"
                  placeholder="Enter your message"
                  value={formik.values.message}
                  isInvalid={formik.touched.message && Boolean(formik.errors.message)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.message && formik.errors.message}
                />
                <Button type="submit" w="40%">
                  Submit
                </Button>
              </Stack>
            </Form>
          </Stack>

          <Stack order={{ base: 1, lg: 2 }}>
            <HStack
              spacing={6}
              align={{ base: 'center', lg: 'flex-start' }}
              justifyContent={{ base: 'center' }}
            >
              <Box boxSize={{ base: '40%', md: '60%', lg: '70%', vxl: 'full' }}>
                <Image rounded="16px" src={contactImg1} alt="contact-1" />
              </Box>

              <Box boxSize={{ base: '40%', md: '60%', lg: '70%', vxl: 'full' }}>
                <Image
                  borderRadius="16px"
                  minW={{ base: '40%', md: '60%', lg: '70%', vxl: 'full' }}
                  src={contactImg2}
                  alt="contact-2"
                  mt={20}
                />
              </Box>
            </HStack>
            <HStack w="full" pt={12} justifyContent="space-between">
              <HStack spacing={4}>
                <Center boxSize="34px" rounded="full" bgColor="primary.800">
                  <Icon color="white" as={MdEmail} />
                </Center>
                <Box>
                  <Text fontFamily="body" fontSize="xs" color="black.300" fontWeight="normal">
                    Email:
                  </Text>
                  <Text fontFamily="body" fontSize="xs" fontWeight="normal">
                    support@goswiftli.com
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={4}>
                <Center boxSize="34px" rounded="full" bgColor="primary.800">
                  <Icon color="white" as={MdLocalPhone} />
                </Center>
                <Box>
                  <Text fontFamily="body" fontSize="xs" color="black.300" fontWeight="normal">
                    Phone:
                  </Text>
                  <Text fontFamily="body" fontSize="xs" fontWeight="normal">
                    0706 250 7559
                  </Text>
                </Box>
              </HStack>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </section>
  );
};
