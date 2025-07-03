import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import Layout from './layout/Layout';
import Home from './pages/Home/page';
import User from './pages/User/page';
import SignIn from './pages/Sign-in/page';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
