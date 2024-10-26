import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import UserListPage from '../../pages/UserListPage';
import AppTemplate from '../../templates/AppTemplate';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AppTemplate}>
          <Route Component={LoginPage} path={AppRoutes.Login} />
          <Route Component={RegistrationPage} path={AppRoutes.Registration} />
          <Route index path={AppRoutes.Root} Component={UserListPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
