import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { HiUser } from 'react-icons/hi2';
import Webcam from 'react-webcam';

import { useToast } from '@/hooks';
import { dataURLtoBlob, fileToBase64, getFileFromIdb, saveFileToIdb } from '@/utils';

type SelfieProps = {
  handleNext: () => void;
  handlePrevious: () => void;
};

export const Selfie = ({ handleNext, handlePrevious }: SelfieProps) => {
  const toast = useToast();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const capturePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImageSrc(imageSrc);
        setShowWebcam(false);

        const blob = dataURLtoBlob(imageSrc);
        const file = new File([blob], 'webcam-photo.jpg', { type: 'image/jpeg' });

        await saveFileToIdb({
          key: 'uploaded-photo',
          data: {
            country: 'NG',
            file,
            fileType: file.type,
            name: file.name,
            size: file.size,
            updatedAt: new Date(),
          },
        });
      }
    }
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    setShowWebcam(false);

    await saveFileToIdb({
      key: 'uploaded-photo',
      data: {
        file,
        fileType: file.type,
        name: file.name,
        size: file.size,
        updatedAt: new Date(),
      },
    });
  };

  useEffect(() => {
    const returnProfilePhoto = async () => {
      const data = (await getFileFromIdb('uploaded-photo')) as { file: File };

      if (data?.file) {
        const base64 = await fileToBase64(data.file);
        setImageSrc(base64);
      }
    };

    returnProfilePhoto();
  }, []);

  const handleNextStep = () => {
    if (!imageSrc) {
      toast({
        id: 'next',
        status: 'error',
        description: 'Please upload a photo',
      });
    } else {
      handleNext();
    }
  };

  return (
    <Box h="full">
      <Stack spacing={6} h="full">
        <Box>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Step 3/4
          </Text>
          <Text fontFamily="lato" fontSize="lg">
            Intermediate Verification
          </Text>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Fill in the parts inside completing the interviewer’s personal
          </Text>
        </Box>
        <Box bgColor="primary.800" px={5} pt={5} h="full">
          <Stack justifyContent="center" h="full">
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor={imageSrc || showWebcam ? 'transparent' : 'blue.200'}
              py={12}
              h="full"
            >
              <Center
                boxSize={imageSrc || showWebcam ? '300px' : '120px'}
                bgColor="primary.500"
                rounded={imageSrc || showWebcam ? '20px' : 'full'}
                p={imageSrc || showWebcam ? 0 : 3}
              >
                {imageSrc ? (
                  <Image src={imageSrc} alt="profile" boxSize="100%" objectFit="cover" />
                ) : showWebcam ? (
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    audio={false}
                    videoConstraints={{ facingMode: 'user' }}
                    style={{ width: '100%', height: '100%', borderRadius: '20px' }}
                  />
                ) : (
                  <Icon color="white" as={HiUser} boxSize="100%" />
                )}
              </Center>
            </Flex>
            <HStack justifyContent="center" pt={4} pb={4}>
              <Button
                rounded="6px"
                onClick={() => fileInputRef.current?.click()}
                w={{ base: 'full', lg: '20%' }}
                variant="outline-1"
                size="sm"
              >
                Upload Photo
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                display="none"
                onChange={handleFileUpload}
              />
              <Button
                onClick={() => {
                  if (showWebcam) {
                    capturePhoto();
                  } else {
                    setImageSrc(null); // clear uploaded or captured image
                    setShowWebcam(true);
                  }
                }}
                rounded="6px"
                w={{ base: 'full', lg: '20%' }}
                variant="outline-1"
                size="sm"
              >
                {showWebcam ? 'Capture' : 'Take Photo'}
              </Button>
            </HStack>
          </Stack>
        </Box>
        <Flex w="full" justifyContent="end">
          <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
            <Button rounded="6px" variant="ghost" onClick={handlePrevious}>
              Back
            </Button>
            <Button rounded="6px" w="full" type="submit" onClick={handleNextStep}>
              Next
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};
