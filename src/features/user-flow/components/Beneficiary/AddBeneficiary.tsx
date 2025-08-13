import {
  Box,
  Flex,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react';

import { BankingInformation } from './BankingInformation';
import { BeneficiaryAddress } from './BeneficiaryAddress';

export const AddBeneficiary = () => {
  const steps = [{ title: 'Banking Information' }, { title: 'Beneficiary Address ' }];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const getStepTitleStyles = (index: number) => {
    if (index === activeStep) {
      return {
        color: 'primary.800',
      };
    }
    return {
      color: 'black.400',
    };
  };

  const getStepBgStyles = (index: number) => {
    if (index === activeStep) {
      return {
        borderColor: 'primary.800',
        color: 'primary.800',
      };
    }
    return { borderColor: 'black.500', color: 'black.500' };
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const stepComponents = [
    <BankingInformation handleNext={handleNext} handlePrevious={handlePrevious} />,
    <BeneficiaryAddress handlePrevious={handlePrevious} />,
  ];

  return (
    <section>
      <Box minH="90vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden" pb={10}>
        <Stack spacing={4}>
          <Flex justifyContent="center" bgColor="white" rounded="16px">
            <Stepper
              p={6}
              index={activeStep}
              colorScheme="primary"
              mb={8}
              gap={12}
              overflowX="auto"
              orientation="horizontal"
              width={{ base: 'full', lg: '80%' }}
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <Flex direction="column" align="center">
                    <StepIndicator {...getStepBgStyles(index)}>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <StepTitle
                      fontFamily="body"
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      mt={2}
                      textAlign="center"
                      {...getStepTitleStyles(index)}
                    >
                      {step.title}
                    </StepTitle>
                  </Flex>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Flex>

          <Box bgColor="white" p={6} rounded="16px" flex={1}>
            {stepComponents[activeStep]}
          </Box>
        </Stack>
      </Box>
    </section>
  );
};
