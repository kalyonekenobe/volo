import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import UserListPage from '../../pages/UserListPage';
import AppTemplate from '../../templates/AppTemplate';
import AuthProtectedRouteTemplate from '../../templates/AuthProtectedRouteTemplate';
import WithNavbarTemplate from '../../templates/WithNavbarTemplate';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AppTemplate}>
          <Route Component={LoginPage} path={AppRoutes.Login} />
          <Route Component={RegistrationPage} path={AppRoutes.Registration} />
          <Route Component={WithNavbarTemplate}>
            <Route Component={AuthProtectedRouteTemplate}>
              <Route index path={AppRoutes.Root} Component={UserListPage} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
