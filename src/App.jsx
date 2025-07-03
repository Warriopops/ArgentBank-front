import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import Layout from './layout/Layout';
import Home from './pages/Home/page';
import User from './pages/User/page';
import SignIn from './pages/Sign-in/page';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<ProtectedRoute><User/></ProtectedRoute>} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
