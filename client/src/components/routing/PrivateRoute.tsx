import { Navigate, Outlet } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );
  const loading = useSelector((state: RootStateOrAny) => state.auth.loading);
  if (loading) return <Spinner />;
  //   if (isAuthenticated) return <Element />;

  //   return <Navigate to='/login' />;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
