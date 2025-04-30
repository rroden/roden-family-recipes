import { Outlet } from 'react-router-dom';
import PageHeader from './recipe/components/PageHeader';

const Layout = () => {
  return (
    <div className="create-page-background">
        <div className="overlay"></div>
        <PageHeader/>
        <main>
            <Outlet />
        </main>
    </div>
  );
};

export default Layout;