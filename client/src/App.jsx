import { Routes, Route } from "react-router";
import { UserContextProvider } from "./Context/UserContext";
import { Dashboard } from "./pages/Dashboard";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
