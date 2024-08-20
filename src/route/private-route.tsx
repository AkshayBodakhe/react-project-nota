import { useEffect, useState } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import providerGroupService from "../service/provider-group--service";
import PrivateRoleRoute from "./private-role-route";
// import PrivateRoleRoute from './private-role-route';

type PrivateRouteProps = RouteProps & {
  children?: React.ReactNode;
  allowedRoles?: string[];
  portalType?: string;
};

function PrivateRoute({
  children,
  allowedRoles,
  portalType,
}: PrivateRouteProps): JSX.Element {
  const isLoggedIn = Boolean(sessionStorage?.getItem("accessToken"));
  const minutes = 28;
  const milliseconds = minutes * 60 * 1000;
  const [tokens, setTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      refreshAccessToken();
    }, milliseconds);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (tokens?.accessToken && tokens?.refreshToken) {
      sessionStorage?.setItem("accessToken", tokens?.accessToken);
      sessionStorage?.setItem("refreshToken", tokens?.refreshToken);
    }
  }, [tokens?.accessToken]);

  async function refreshAccessToken() {
    const refreshToken: string = sessionStorage.getItem("refreshToken") || "";
    await providerGroupService.getRefreshToken(refreshToken).then((res) => {
      if (res?.data && res?.data?.data) {
        setTokens(() => ({
          accessToken: res.data?.data?.accessToken,
          refreshToken: res.data?.data?.refreshToken,
        }));
      }
    });
  }
  return (
    <>
      {isLoggedIn ? (
        <PrivateRoleRoute
          element={children}
          allowedRoles={allowedRoles}
          portalType={portalType}
        />
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </>
  );
}

export default PrivateRoute;
