import { Routes, Route } from "react-router";
import { UserContextProvider } from "./Context/UserContext";
import { Dashboard } from "./pages/Dashboard";
import LoginPage from "./pages/login";
import Field from "./pages/Field";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Field" element={<Field />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
