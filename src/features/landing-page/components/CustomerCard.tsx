import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';

export type CustomerCardProps = {
  customerName: string;
  transactionAmount: string;
  jobType: string;
  jobDescription: string;
};

export const CustomerCard = (props: CustomerCardProps) => {
  const { customerName, transactionAmount, jobType, jobDescription } = props;
  return (
    <Card>
      <CardBody>
        <Stack spacing={6}>
          <HStack spacing={6}>
            <Center boxSize="125px" border="1px solid" borderRadius="1rem">
              <Center boxSize="100px" bgColor="primary.800" borderRadius="1rem">
                <Text fontFamily="body" color="white" fontWeight="extrabold" fontSize="5xl">
                  {customerName.substring(0, 1).toLocaleUpperCase()}
                </Text>
              </Center>
            </Center>
            <Stack>
              <Text fontFamily="body" fontSize="2xl" fontWeight="bold">
                {customerName}
              </Text>
              <HStack spacing={4}>
                <Box>
                  <Text fontFamily="body" fontWeight="medium" fontSize="md">
                    Transactions
                  </Text>
                  <Text fontSize="2xl" fontWeight="extrabold" fontFamily="body">
                    {transactionAmount}
                  </Text>
                </Box>
                <Divider orientation="vertical" h="60px" borderWidth="1px" borderColor="black" />
                <Box>
                  <Text fontFamily="body" fontWeight="medium" fontSize="md">
                    {jobType}
                  </Text>
                  <Text fontSize="2xl" fontWeight="extrabold" fontFamily="body">
                    {jobDescription}
                  </Text>
                </Box>
              </HStack>
            </Stack>
          </HStack>
          <Button w="full" minH="64px">
            Join for free
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
