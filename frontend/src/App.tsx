import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

import BuilderLayout from "./pages/builder/Layout";
import BuilderDashboard from "./pages/builder/Dashboard";
import BuilderProjects from "./pages/builder/Projects";
import BuilderProjectDetail from "./pages/builder/ProjectDetail";
import BuilderUpdates from "./pages/builder/Updates";
import BuilderMaterials from "./pages/builder/Materials";
import BuilderClients from "./pages/builder/Clients";
import BuilderQueriesPage from "./pages/builder/QueriesPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ApprovalRequests from "./pages/admin/ApprovalRequests";
import AdminProjects from "./pages/admin/AdminProjects";

import ClientLayout from "./pages/client/Layout";
import ClientOverview from "./pages/client/Overview";
import ClientProgress from "./pages/client/Progress";
import ClientUpdates from "./pages/client/Updates";
import ClientQueriesPage from "./pages/client/QueriesPage";
import ClientProjectDetail from "./pages/client/ProjectDetail";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Navigate to={user.role === "client" ? "/client" : user.role === "admin" ? "/admin" : "/builder"} replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />

            {/* ── Builder / Admin ── */}
            <Route
              path="/builder"
              element={
                <ProtectedRoute roles={["builder", "admin"]}>
                  <BuilderLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BuilderDashboard />} />
              <Route path="projects" element={<BuilderProjects />} />
              <Route path="projects/:id" element={<BuilderProjectDetail />} />
              <Route path="updates" element={<BuilderUpdates />} />
              <Route path="materials" element={<BuilderMaterials />} />
              <Route path="clients" element={<BuilderClients />} />
              <Route path="queries" element={<BuilderQueriesPage />} />
            </Route>

            {/* ── Admin ── */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <BuilderLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="approvals" element={<ApprovalRequests />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/:id" element={<BuilderProjectDetail />} />
            </Route>

            {/* ── Client ── */}
            <Route
              path="/client"
              element={
                <ProtectedRoute roles={["client"]}>
                  <ClientLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ClientOverview />} />
              <Route path="progress" element={<ClientProgress />} />
              <Route path="updates" element={<ClientUpdates />} />
              <Route path="queries" element={<ClientQueriesPage />} />
              <Route path="projects/:id" element={<ClientProjectDetail />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
