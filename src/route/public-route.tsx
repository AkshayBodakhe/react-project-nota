import { Navigate, RouteProps, useLocation } from 'react-router-dom';

function PublicRoute({ children }: RouteProps): JSX.Element {
  const isLoggedIn = Boolean(sessionStorage.getItem('accessToken'));
  const location = useLocation();
  const role = sessionStorage.getItem("role")
  const redirectToPrevious = () => {
    if (location.state && location.state.from) {
      return <Navigate to={location.state.from} replace />;
    }
    if (role === 'PROVIDER') {
      return <Navigate to={'/provider/appointment/calendar'} replace />;
    } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      return <Navigate to={'/admin/provider-groups'} replace />;
    } else {
      return <Navigate to={'/auth/login'} replace />;
    }
  };
  return <>{isLoggedIn ? redirectToPrevious() : children}</>;
}

export default PublicRoute;