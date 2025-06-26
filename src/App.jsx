import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home/page';
import User from './pages/User/page';
import SignIn from './pages/Sign-in/page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
