import { Route, Routes } from "react-router"
import LoginPage from "../modules/auth/page/LoginPage"
import ArticleListPage from "../modules/article/page/ArticleListPage"
import CategoryListPage from "../modules/category/page/CategoryListPage"
import PlaceholderPage from "../pages/PlaceholderPage"
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
              <PlaceholderPage title="Admin Management" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/doula-management" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Doula Management" />
            </AdminLayout>
          </ProtectedRoute>
        }>
        </Route>

        <Route path="/client-management" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Client Management" />
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

        <Route path="/voucher" element={
          <ProtectedRoute>
            <AdminLayout>
              <PlaceholderPage title="Voucher" />
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
