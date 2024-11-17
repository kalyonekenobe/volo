import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import AppTemplate from '../../templates/AppTemplate';
import AuthProtectedRouteTemplate from '../../templates/AuthProtectedRouteTemplate';
import WithNavbarAndFooterTemplate from '../../templates/WithNavbarAndFooterTemplate';
import MainPage from '../../pages/MainPage/MainPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AppTemplate}>
          <Route Component={LoginPage} path={AppRoutes.Login} />
          <Route Component={RegistrationPage} path={AppRoutes.Registration} />
          <Route Component={RegistrationPage} path={AppRoutes.Registration} />
          <Route Component={WithNavbarAndFooterTemplate}>
            <Route index path={AppRoutes.Root} Component={MainPage} />
            <Route Component={AuthProtectedRouteTemplate}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
