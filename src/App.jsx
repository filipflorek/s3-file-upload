import Login from "./Login";
import { ChakraProvider, Center } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import Home from "./Home";
import RouteGuard from "./RouteGuard";
import "./App.css";
import DragDrop from "./DragDrop";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Center w="100%" min-height="300px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route
              path="file"
              element={
                <RouteGuard>
                  <DragDrop />
                </RouteGuard>
              }
            />
          </Routes>
        </Center>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
