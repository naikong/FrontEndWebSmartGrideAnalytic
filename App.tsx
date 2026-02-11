import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './src/pages/components/Layout';
import CompanyList from './src/pages/Company/CompanyList';
import CreateCompany from './src/pages/Company/CreateCompany';
import CompanyDetail from './src/pages/Company/CompanyDetail';
import EditCompany from './src/pages/Company/EditCompany';
import UserList from './src/pages/User/UserList';
import CreateUser from './src/pages/User/CreateUser';
import UserDetail from './src/pages/User/UserDetail';
import EditUser from './src/pages/User/EditUser';
import Login from './src/pages/Auth/Login';
import ForgotPassword from './src/pages/Auth/ForgotPassword';
import ResetPassword from './src/pages/Auth/ResetPassword';
import MeterList from './src/pages/Meter/MeterList';
import MeterDetail from './src/pages/Meter/MeterDetail';
import EditMeter from './src/pages/Meter/EditMeter';
import CreateMeter from './src/pages/Meter/CreateMeter';
import Dashboard from './src/pages/Dashboard/TBDashboard';

const DashboardRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/company" replace />} />
      <Route path="/company" element={<CompanyList />} />
      <Route path="/company/create" element={<CreateCompany />} />
      <Route path="/company/detail/:id" element={<CompanyDetail />} />
      <Route path="/company/edit/:id" element={<EditCompany />} />
      
      <Route path="/user" element={<UserList />} />
      <Route path="/user/vpstart" element={<UserList />} />
      <Route path="/user/customer" element={<UserList />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/detail/:id" element={<UserDetail />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
      
      <Route path="/upload" element={<MeterList />} />
      <Route path="/meter/create" element={<CreateMeter />} />
      <Route path="/meter/detail/:id" element={<MeterDetail />} />
      <Route path="/meter/edit/:id" element={<EditMeter />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Layout>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<DashboardRoutes />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;