import { JSXElementConstructor, ReactElement } from 'react'
import { useRoutes } from 'react-router-dom';
// import { Navigate, Route } from "react-router-dom";
import AdminDashboardPage from "./../pages/app/admin/dashboard";
// import MasterIndex from "./../pages/app/admin/new-master/masterIndex";
import AdminProviderGroupsPage from "./../pages/app/admin/provider-groups";
// import ProviderGroupDepartment, {
//     Departments,
// } from "./../pages/app/admin/provider-groups/details/provider-group-department/provider-group-department";
// import ProviderGroupLocations from "./../pages/app/admin/provider-groups/details/provider-group-location/provider-group-location";
// import ProviderGroupPatientPage, {
//     Patients,
// } from "./../pages/app/admin/provider-groups/details/provider-group-patients";
import ProviderGroupProfile from "./../pages/app/admin/provider-groups/details/provider-group-profile/provider-group-profile";
// import ProviderGroupUsersPage from "./../pages/app/admin/provider-groups/details/provider-group-users";
// import ViewAdminProviderGroupProviderDetails from "./../pages/app/admin/provider-groups/details/provider-group-users/view-admin-provider-group-provider-details";
// import ViewAdminProviderGroupStaffDetails from "./../pages/app/admin/provider-groups/details/provider-group-users/view-admin-provider-group-staff-details";
// import AdminProviderGroupPage from "./../pages/app/admin/provider-groups/details/provider-groups/provider-groups-admin";
// import AdminSettingsPage from "./../pages/app/admin/settings";
// import AdminUser from "./../pages/app/admin/settings/admin-user/admin-user";
// import AuditLog from "./../pages/app/admin/settings/audit-log/audit-log";
// import RoleIndex from "./../pages/app/admin/settings/roles-responsibility/role-index";
// import UserSettingsMainComponent from "./../pages/app/admin/settings/user-settings-index";
// import ProviderHomePage from "./../pages/app/provider/home";
// import AddPatientPage from "./../pages/app/provider/patient/add-patient/add-patient-tab";
// import PatientList from "./../pages/app/provider/patient/patientList";
// import ProviderSettings from "./../pages/app/provider/settings/provider-settings/provider-settings";
// import EnterOTP from "./../pages/auth/enter-otp";
// import ForgotPasswordPage from "./../pages/auth/forgot-password";
// import LoginPage from "./../pages/auth/login";
// import LogoutPage from "./../pages/auth/logout";
// import ResetPasswordPage from "./../pages/auth/reset-password";
// import SignUp from "./../pages/auth/sign-up";
// import IndividualPatientDetails from "./../pages/app/provider/patient/patient-details/individualPatientDetails";
// import ContactDictionary from "./../pages/app/provider/communication/contact-dictionary/contact-dictionary";
// import ProviderTasks from "./../pages/app/provider/communication/tasks/index";

const PrivateRoutes = () => {

    const privateRoutes: ReactElement<any, string | JSXElementConstructor<any>> | null = useRoutes([
        {
            path: '/admin',
            children: [
                {
                    path: 'dashboard',
                    element: <AdminDashboardPage />
                },
                {
                    path: 'provider-groups',
                    element: <AdminProviderGroupsPage />,
                    children: [
                        {
                            path: ':id',
                            children: [
                                {
                                    path: 'profile',
                                    element: <ProviderGroupProfile />
                                }
                            ]
                        },
                    ]
                }
            ]

        }
    ])

    return privateRoutes;
}

export default PrivateRoutes;
