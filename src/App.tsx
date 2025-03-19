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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Protected route component
const ProtectedRoute = ({ children, requiredRoles = [] }: { children: JSX.Element, requiredRoles?: string[] }) => {
  const { isAuthenticated, user, isKaryawan } = useAuth();

  if (isAuthenticated === undefined) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Special handling for regular employees
  if (isKaryawan) {
    // Allow access to employee list and view-only evaluation
    if (window.location.pathname === '/evaluation' && !window.location.search.includes('view=true')) {
      const params = new URLSearchParams(window.location.search);
      const employeeId = params.get('employeeId');
      // Only allow viewing their own evaluation
      if (employeeId && user && employeeId !== user.id) {
        return <Navigate to="/" />;
      }
    }
  }

  if (requiredRoles.length > 0 && (!user || !user.role || !requiredRoles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AnimatePresence mode="wait"><Index /></AnimatePresence>} />
      <Route path="/login" element={<AnimatePresence mode="wait"><Login /></AnimatePresence>} />
      <Route 
        path="/policies" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin']}>
            <AnimatePresence mode="wait"><Policies /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/policy/:id" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin']}>
            <AnimatePresence mode="wait"><PolicyDetail /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employees" 
        element={
          <ProtectedRoute>
            <AnimatePresence mode="wait"><Employees /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/evaluation" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin', 'karyawan']}>
            <AnimatePresence mode="wait"><Evaluation /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manager-evaluations" 
        element={
          <ProtectedRoute requiredRoles={['pemimpin']}>
            <AnimatePresence mode="wait"><ManagerEvaluations /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/documents" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager', 'pemimpin', 'karyawan']}>
            <AnimatePresence mode="wait"><Documents /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/upload-document" 
        element={
          <ProtectedRoute requiredRoles={['karyawan']}>
            <AnimatePresence mode="wait"><DocumentUpload /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/criteria" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <AnimatePresence mode="wait"><CriteriaPage /></AnimatePresence>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<AnimatePresence mode="wait"><NotFound /></AnimatePresence>} />
    </Routes>
  );
};

export default App;