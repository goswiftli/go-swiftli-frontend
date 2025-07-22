import {
  Box,
  Flex,
  Icon,
  Stack,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  Stepper,
  StepStatus,
  StepTitle,
  useBreakpointValue,
  useSteps,
} from '@chakra-ui/react';
import { BiSolidUser } from 'react-icons/bi';

import { ReactComponent as SelfieIcon } from '@/assets/icons/Front camera.svg';
import { ReactComponent as ReviewIcon } from '@/assets/icons/Review.svg';
import { ReactComponent as ScanIcon } from '@/assets/icons/Scanning.svg';

import { IdVerification } from './IdVerification';
import { PersonalInformation } from './PersonalInformation';
import { Review } from './Review';
import { Selfie } from './Selfie';

export const Kyc = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const steps = [
    { title: 'Personal Info', description: 'Provide your details' },
    { title: 'ID Verification', description: 'Upload your ID' },
    { title: 'Selfie', description: 'Take a photo' },
    { title: 'Review', description: 'Confirm your details' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const getStepTitleStyles = (index: number) => {
    if (index === activeStep) {
      return {
        fontWeight: isMobile ? 'medium' : 'semibold',
        color: 'black',
      };
    }
    return {
      color: 'black.400',
    };
  };

  const getStepBgStyles = (index: number) => {
    if (index === activeStep) {
      return {
        bgColor: 'primary.800',
      };
    }
    return { bgColor: 'grey.200' };
  };

  const getStepIcon = (index: number, isActive: boolean) => {
    const iconProps = isActive
      ? { fill: 'white', fontSize: '1.2em' }
      : {
          color: 'primary.800',
          cursor: 'pointer',
          fill: 'grey.600',
        };
    const svgFilter = isActive ? 'brightness(0) invert(1)' : 'brightness(0) invert(40%)';

    switch (index) {
      case 0:
        return <Icon as={BiSolidUser} sx={iconProps} />;
      case 1:
        return <ScanIcon style={{ filter: svgFilter }} />;
      case 2:
        return <SelfieIcon style={{ filter: svgFilter }} />;
      case 3:
        return <ReviewIcon style={{ filter: svgFilter }} />;
      default:
        return <StepNumber />;
    }
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
    <PersonalInformation
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      activeStep={activeStep}
    />,
    <IdVerification handleNext={handleNext} handlePrevious={handlePrevious} />,
    <Selfie handleNext={handleNext} handlePrevious={handlePrevious} />,
    <Review handlePrevious={handlePrevious} />,
  ];

  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden">
        <Box bgColor="white" p={6} rounded="16px">
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={10} pt={12}>
            <Box w={{ base: 'full', lg: '25%' }} overflowX="auto">
              <Stepper
                index={activeStep}
                colorScheme="primary"
                mb={8}
                orientation={isMobile ? 'horizontal' : 'vertical'}
                gap={12}
              >
                {steps.map((step, index) => (
                  <Step key={index} w="full" as={Flex}>
                    <Stack
                      direction={{ base: 'column', lg: 'row' }}
                      justifyContent="space-between"
                      w="full"
                      h="full"
                    >
                      <Box h="full">
                        <StepTitle
                          fontFamily="body"
                          fontSize={{ base: 'sm', lg: 'lg' }}
                          {...getStepTitleStyles(index)}
                        >
                          {step.title}
                        </StepTitle>
                        <StepDescription
                          fontFamily="body"
                          fontSize={{ base: 'xs', lg: 'md' }}
                          {...getStepTitleStyles(index)}
                        >
                          {step.description}
                        </StepDescription>
                      </Box>

                      <StepIndicator boxSize="40px" {...getStepBgStyles(index)}>
                        <StepStatus
                          complete={getStepIcon(index, true)}
                          incomplete={getStepIcon(index, false)}
                          active={getStepIcon(index, true)}
                        />
                      </StepIndicator>
                    </Stack>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box flex={1}>{stepComponents[activeStep]}</Box>
          </Stack>
        </Box>
      </Box>
    </section>
  );
};
