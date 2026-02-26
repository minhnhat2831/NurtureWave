import { Route, Routes } from "react-router"
import LoginPage from "../modules/auth/page/LoginPage"
import { AdminLayout } from '@/layouts';
import PublicRoute from "@/components/context/PublicRoute";
import ProtectedRoute from "@/components/context/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }></Route>
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout>
              <div style={{ padding: 40 }}></div>
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>
      </Routes >
    </>
  )
}

export default App
