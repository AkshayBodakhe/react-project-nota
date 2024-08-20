import AppLayout from '../../../../../components/core/layout/layout';
import { adminConstants } from '../../../../../constants/admin';
import UsersCard from './users-card';
const { ADMIN } =adminConstants;

function AdminUser() {
  return (
    <>
      <UsersCard/>
    </>
  )
}
export default AppLayout(AdminUser, { source: ADMIN });
