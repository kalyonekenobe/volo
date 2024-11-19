import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../consts/app.consts';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import AppTemplate from '../../templates/AppTemplate';
import AuthProtectedRouteTemplate from '../../templates/AuthProtectedRouteTemplate';
import WithNavbarAndFooterTemplate from '../../templates/WithNavbarAndFooterTemplate';
import MainPage from '../../pages/MainPage';
import PostsListPage from '../../pages/PostsListPage';
import UsersListPage from '../../pages/UsersListPage';
import PostCreatePage from '../../pages/PostCreatePage';
import SinglePostImage from '../../pages/SinglePostPage/SinglePostPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AppTemplate}>
          <Route Component={LoginPage} path={AppRoutes.Login} />
          <Route Component={RegistrationPage} path={AppRoutes.Registration} />
          <Route Component={RegistrationPage} path={AppRoutes.Registration} />
          <Route Component={WithNavbarAndFooterTemplate}>
            <Route Component={AuthProtectedRouteTemplate}>
              <Route index path={AppRoutes.PostsCreate} Component={PostCreatePage} />
              <Route index path={AppRoutes.Root} Component={MainPage} />
              <Route index path={AppRoutes.PostsList} Component={PostsListPage} />
              <Route index path={AppRoutes.PostsList + '/:id'} Component={SinglePostImage} />
              <Route index path={AppRoutes.UsersList} Component={UsersListPage} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
