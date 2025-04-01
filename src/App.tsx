import { AppRouter } from '@/routes';
import { AppProvider } from './providers';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
