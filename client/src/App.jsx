import { Routes, Route } from "react-router";
import { UserContextProvider } from "./Context/UserContext";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
