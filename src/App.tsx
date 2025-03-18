
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
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
        <Route path="/policies" element={<Policies />} />
        <Route path="/policy/:id" element={<PolicyDetail />} />
        
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
            <ProtectedRoute>
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
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
