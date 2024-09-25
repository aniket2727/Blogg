import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoginDetailsProvider } from './contextApis/LoginDetailsContext';
import NavbarComponent from './component/NavbarComponent';
import Footer from './component/FooterComponent';

// Lazy-loaded components
const MyLoginform = lazy(() => import('./page/LoginpageComponent'));
const RegisterFormPageComponent = lazy(() => import('./page/RegisterPageComponent'));
const HomepageComponent = lazy(() => import('./page/HomepageComponent'));
const EmailManager = lazy(() => import('./manage/Emailmanger'));
const Accountpage = lazy(() => import('./page/Accountpage'));
const Createpost = lazy(() => import('./page/Createpost'));
const Postpage = lazy(() => import('./page/Postpage'));

// Simple Loader Component
const LoaderComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-2xl">Loading...</div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second loading time on the first load
    const timer = setTimeout(() => {
      setLoading(false);  // After 3 seconds, stop loading
    }, 3000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderComponent />;  // Show loading screen for 3 seconds
  }

  return (
    <div>
      <BrowserRouter>
        <LoginDetailsProvider>
          <NavbarComponent />

          {/* Wrap Routes with Suspense for lazy loading */}
          <Suspense fallback={<LoaderComponent />}>
            <Routes>
              <Route path='/login' element={<MyLoginform />} />
              <Route path='/signup' element={<RegisterFormPageComponent />} />
              <Route path='/email' element={<EmailManager />} />
              <Route path='/home' element={<HomepageComponent />} />
              <Route path='/account' element={<Accountpage />} />
              <Route path='/createpost' element={<Createpost />} />
              <Route path='/postpage' element={<Postpage />} />

              {/* Catch-all route to redirect unknown URLs to the home page */}
              <Route path='*' element={<Navigate to="/home" />} />
            </Routes>
          </Suspense>

          <Footer />
        </LoginDetailsProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
