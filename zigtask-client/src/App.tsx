import "./App.css";

import { ThemeProvider } from "./components/ui/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import { ProtectedLayout } from "./pages/dashboard/ProtectedLayout";
import Task from "./pages/dashboard/Task";
import TaskDragDrop from "./pages/dashboard/TaskDragDrop";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/dashboard/tasks"
            element={
              <ProtectedLayout>
                <Task />
              </ProtectedLayout>
            }
          ></Route>
          <Route
            path="/dashboard/tasks/drag"
            element={
              <ProtectedLayout>
                <TaskDragDrop />
              </ProtectedLayout>
            }
          ></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
