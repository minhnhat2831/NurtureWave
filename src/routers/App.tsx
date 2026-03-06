import { Route, Routes, Navigate } from "react-router"
import LoginPage from "../modules/auth/page/LoginPage"
import ArticleListPage from "../modules/article/page/ArticleListPage"
import CategoryListPage from "../modules/category/page/CategoryListPage"
import VoucherListPage from "../modules/voucher/page/VoucherListPage"
import VoucherDetailPage from "../modules/voucher/page/VoucherDetailPage"
import PlaceholderPage from "../pages/PlaceholderPage"
import { AdminLayout } from '@/layouts';
import PublicRoute from "@/components/context/PublicRoute";
import ProtectedRoute from "@/components/context/ProtectedRoute";
import AdminPage from "@/modules/admin/page/AdminPage";
import DoulaPage from "@/modules/doula/pages/DoulaPage";
import DoulaViewPage from "@/modules/doula/pages/DoulaViewPage";
import PackagePage from "@/modules/doula/pages/PackageDetailPage";
import ClientPage from "@/modules/client/page/ClientPage";
import ClientViewPage from "@/modules/client/page/ClientViewPage";

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
              <PlaceholderPage title="Dashboard" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        {/* Article Module */}
        <Route path="/admin/articles" element={
          <ProtectedRoute>
            <AdminLayout>
              <ArticleListPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        {/* Placeholder Routes - To be implemented */}
        <Route path="/static-content" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Static Content" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/admin-management" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/doula-management/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <DoulaViewPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/doula-management" element={
          <ProtectedRoute>
            <AdminLayout>
              <DoulaPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/package/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <PackagePage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/client-management/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <ClientViewPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/client-management" element={
          <ProtectedRoute>
            <AdminLayout>
              <ClientPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/pd-session" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="PD Session" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        {/* Category Module */}
        <Route path="/admin/categories" element={
          <ProtectedRoute>
            <AdminLayout>
              <CategoryListPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/subscriptions" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Subscriptions" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        {/* Redirect old voucher route */}
        <Route path="/voucher" element={<Navigate to="/vouchers" replace />} />

        <Route path="/vouchers" element={
          <ProtectedRoute>
            <AdminLayout>
              <VoucherListPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/vouchers/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <VoucherDetailPage />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/help-documents" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Help Documents" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/search-settings" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Search Settings" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>
      </Routes >
    </>
  )
}

export default App
