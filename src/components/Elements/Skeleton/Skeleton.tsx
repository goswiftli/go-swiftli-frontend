import {
  BoxProps,
  Skeleton as ChakraSkeleton,
  SkeletonCircle as ChakraSkeletonCircle,
  SystemStyleObject,
  type SkeletonProps as ChakraSkeletonProps,
} from '@chakra-ui/react';

type SkeletonProps = ChakraSkeletonProps & {
  isLoading: boolean;
  children: React.ReactNode;
  styles?: SystemStyleObject;
  isError: boolean;
  skeletonProps?: SkeletonProps & BoxProps;
};

export const Skeleton = ({
  isLoading,
  children,
  styles,
  isError,
  skeletonProps,
  ...boxProps
}: SkeletonProps) => {
  if (isError) {
    return <></>;
  }
  return (
    <ChakraSkeleton
      isLoaded={!isLoading}
      w="full"
      fadeDuration={1}
      startColor="grey.100"
      endColor="grey.200"
      sx={styles}
      {...skeletonProps}
      {...boxProps}
    >
      {children}
    </ChakraSkeleton>
  );
};

export const SkeletonCircle = ({
  isLoading,
  children,
  styles,
  isError,
  skeletonProps,
  ...boxProps
}: SkeletonProps) => {
  if (isError) {
    return <></>;
  }
  return (
    <ChakraSkeletonCircle
      isLoaded={!isLoading && !isError}
      w="full"
      fadeDuration={1}
      {...skeletonProps}
      {...boxProps}
      startColor="gray.100"
      endColor="gray.200"
      sx={styles}
    >
      {children}
    </ChakraSkeletonCircle>
  );
};
