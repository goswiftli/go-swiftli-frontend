import { Button, Text, VStack } from '@chakra-ui/react';
import { ErrorBoundary as REB, FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4">
      <VStack role="alert" spacing={8}>
        <Text fontFamily="body" fontWeight="semibold" fontSize="lg">
          Ooops, something went wrong :({' '}
        </Text>
        <Text fontFamily="body" fontWeight="medium" fontSize="md" color="error.400">
          {error.name} - {error.message}
        </Text>
        <Button
          size="sm"
          rounded="4px"
          onClick={() => {
            resetErrorBoundary();
          }}
        >
          Refresh
        </Button>
      </VStack>
    </div>
  );
};

type Props = {
  children?: React.ReactNode;
  resetKeys?: any[];
  onReset?: () => void;
};

export const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return <REB FallbackComponent={ErrorFallback}>{children}</REB>;
};
