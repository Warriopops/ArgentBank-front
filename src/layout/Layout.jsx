import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Layout.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from '../actions/user.action';

export default function Layout() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getProfile({ token }));
    }
  }, [dispatch, token]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
