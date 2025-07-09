import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
