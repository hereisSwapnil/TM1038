import { Routes, Route } from "react-router";
import { UserContextProvider } from "./Context/UserContext";
import { Dashboard } from "./pages/Dashboard";
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
