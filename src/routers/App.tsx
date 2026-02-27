import { Route, Routes, Outlet } from "react-router"
import LoginPage from "../modules/auth/page/LoginPage"
import { AdminLayout } from '@/layouts';
import PublicRoute from "@/components/context/PublicRoute";
import ProtectedRoute from "@/components/context/ProtectedRoute";

const Placeholder = ({ title }: { title: string }) => <div>{title}</div>;

const adminRoutes = [
  { path: "/static-content", title: "Static Content" },
  { path: "/admin-management", title: "Admin Management" },
  { path: "/doula-management", title: "Doula Management" },
  { path: "/client-management", title: "Client Management" },
  { path: "/article", title: "Article" },
  { path: "/pd-session", title: "PD Session" },
  { path: "/category", title: "Category" },
  { path: "/subscriptions", title: "Subscriptions" },
  { path: "/voucher", title: "Voucher" },
  { path: "/help-documents", title: "Help Documents" },
  { path: "/search-settings", title: "Search Settings" },
];

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }></Route>
        
        <Route element={
          <ProtectedRoute>
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          </ProtectedRoute>
        }>
          {adminRoutes.map(({ path, title }) => (
            <Route key={path} path={path} element={<Placeholder title={title} />} />
          ))}
        </Route>
      </Routes >
    </>
  )
}

export default App
