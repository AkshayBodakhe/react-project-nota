import ProviderGroupUsers, { USERS } from "./provider-group-users";

function ProviderGroupUsersPage() {
  return (
    <ProviderGroupUsers type={USERS.ALL_USERS} />
  );
}

export default ProviderGroupUsersPage;
