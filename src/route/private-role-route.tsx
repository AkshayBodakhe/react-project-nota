import { useSelector } from "react-redux";
import { ClearSessionStorage } from "../pages/auth/removeSessionStorage";
import { useNavigate } from "react-router-dom";

const PrivateRoleRoute = ({ element, allowedRoles, portalType }: any) => {
  if (!allowedRoles) return element;
  const loginData = useSelector(
    (state: any) => state.commonReducer.loginReducer
  );
  // for the admin and provider/care portal segregation
  const isCategoryExist = allowedRoles?.includes(
    loginData?.tokenData?.category
  );
  if (isCategoryExist) return element;

  if (!portalType) return element;
  const isPortalExist = portalType === loginData?.tokenData?.portal;
  if (isPortalExist) return element;

  //
  const navigate = useNavigate();

  if (!location.href?.includes("login")) {
    setTimeout(() => {
      ClearSessionStorage();
      navigate("/auth/login");
    }, 1000);
  }
};

export default PrivateRoleRoute;
