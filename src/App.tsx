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
 {/* <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new" element={<NewProject />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes> */}