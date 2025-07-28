import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from 'sonner';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <Toaster position="top-center" richColors theme="dark" />
    </Provider>
  );
}
