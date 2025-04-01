import { Button } from '@chakra-ui/react';
import { ErrorBoundary as REB, FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4">
      <div
        role="alert"
        className="w-full rounded-md border border-status-error bg-orange-100 bg-opacity-10 p-4"
      >
        <h2 className="text-base font-semibold">Ooops, something went wrong :( </h2>
        <p className="text-sm pb-4 text-status-error">
          {error.name} - {error.message}
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-4"
          onClick={() => {
            resetErrorBoundary();
          }}
        >
          Refresh
        </Button>
      </div>
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
