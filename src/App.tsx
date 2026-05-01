import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import { DoctorProvider } from './context/DoctorContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components';

import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <AuthProvider>
      <DoctorProvider>
        <PostProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/:id" element={<ServiceDetailsPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PostProvider>
      </DoctorProvider>
    </AuthProvider>
  );
}
