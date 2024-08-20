import { useLocation } from "react-router-dom";
import getProviderUserDetails from "../../../../../../mock-data/getProviderUserDetails.json";
import { adminConstants } from "../../../../../../constants/admin";
import ProviderProfile from "../../../../../../components/core/view-provider-details/provider-profile-details";

const { ADMIN } = adminConstants;


function ProfilePage() {

    const location = useLocation();
    const uuid = location && location.state && location.state.providerGroupUuid;
    const providerId = location && location.state && location.state.providerId;

    return (
        <>
            <ProviderProfile
                providerDetails={getProviderUserDetails}
                source={ADMIN}
                providerGroupId={uuid}
                providerId={providerId}
            />
        </>
    );
}

export default ProfilePage;