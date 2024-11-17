import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const WithNavbarAndFooterTemplate = () => {
  // todo: make navbar and insert it here
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default WithNavbarAndFooterTemplate;
