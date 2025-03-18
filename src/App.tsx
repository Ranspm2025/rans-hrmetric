import { Toaster } from "@/components/ui/toaster"; // Gunakan salah satu antara Toaster atau Sonner
// import { Toaster as Sonner } from "@/components/ui/sonner"; // Hapus ini jika tidak diperlukan
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Policies from "./pages/Policies";
import PolicyDetail from "./pages/PolicyDetail";
import Employees from "./pages/Employees";
import Evaluation from "./pages/Evaluation";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Documents from "./pages/Documents";
import DocumentUpload from "./pages/DocumentUpload";
import CriteriaPage from "./pages/CriteriaPage";
import ManagerEvaluations from "./pages/ManagerEvaluations";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requiredRoles = [] }: { children: JSX.Element, requiredRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated === undefined) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length > 0 && (!user || !user.role || !requiredRoles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/policies" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin']}>
              <Policies />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/policy/:id" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin']}>
              <PolicyDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employees" 
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/evaluation" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin', 'karyawan']}>
              <Evaluation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager-evaluations" 
          element={
            <ProtectedRoute requiredRoles={['pemimpin']}>
              <ManagerEvaluations />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin', 'karyawan']}>
              <Documents />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload-document" 
          element={
            <ProtectedRoute requiredRoles={['karyawan']}>
              <DocumentUpload />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/criteria" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <CriteriaPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          {/* Jika ingin pakai Sonner, hapus <Toaster /> dan uncomment ini */}
          {/* <Sonner /> */}
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;