import { useSelector } from 'react-redux';

interface Permission {
  id: number;
  module: string;
  permissionKey: string;
  permissionName: string;
  description: string;
}

const usePermissions = (): Permission[] => {
  const permissions = useSelector((state: any) => state.commonReducer.userDetail?.data.permissions);
  return permissions || [];
};

const hasPermission = (permissions: Permission[], requiredPermissionKey: string): boolean => {
  return permissions.some(permission => permission.permissionKey === requiredPermissionKey);
};

const useHasPermission = (requiredPermissionKey: string): boolean => {
  const permissions = usePermissions();
  return hasPermission(permissions, requiredPermissionKey);
};

export default useHasPermission;
