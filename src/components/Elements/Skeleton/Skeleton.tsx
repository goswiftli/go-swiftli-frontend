import {
  Skeleton as ChakraSkeleton,
  SystemStyleObject,
  type SkeletonProps as ChakraSkeletonProps,
} from '@chakra-ui/react';

type SkeletonProps = ChakraSkeletonProps & {
  isLoading: boolean;
  children: React.ReactNode;
  styles?: SystemStyleObject;
  isError: boolean;
  skeletonProps?: SkeletonProps;
};

export const Skeleton = ({
  isLoading,
  children,
  styles,
  isError,
  skeletonProps,
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
    >
      {children}
    </ChakraSkeleton>
  );
};
