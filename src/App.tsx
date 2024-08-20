import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminDashboardPage from "./pages/app/admin/dashboard";
import MasterIndex from "./pages/app/admin/new-master/masterIndex";
import AdminProviderGroupsPage from "./pages/app/admin/provider-groups";
import ProviderGroupDepartment, {
  Departments,
} from "./pages/app/admin/provider-groups/details/provider-group-department/provider-group-department";
import ProviderGroupLocations from "./pages/app/admin/provider-groups/details/provider-group-location/provider-group-location";
import ProviderGroupPatientPage, {
  Patients,
} from "./pages/app/admin/provider-groups/details/provider-group-patients";
import ProviderGroupProfile from "./pages/app/admin/provider-groups/details/provider-group-profile/provider-group-profile";
import ProviderGroupUsersPage from "./pages/app/admin/provider-groups/details/provider-group-users";
import ViewAdminProviderGroupProviderDetails from "./pages/app/admin/provider-groups/details/provider-group-users/view-admin-provider-group-provider-details";
import ViewAdminProviderGroupStaffDetails from "./pages/app/admin/provider-groups/details/provider-group-users/view-admin-provider-group-staff-details";
import AdminProviderGroupPage from "./pages/app/admin/provider-groups/details/provider-groups/provider-groups-admin";
import AdminSettingsPage from "./pages/app/admin/settings";
import AdminUser from "./pages/app/admin/settings/admin-user/admin-user";
import AuditLog from "./pages/app/admin/settings/audit-log/audit-log";
import RoleIndex from "./pages/app/admin/settings/roles-responsibility/role-index";
import UserSettingsMainComponent from "./pages/app/admin/settings/user-settings-index";
import ContactDictionary from "./pages/app/provider/communication/contact-dictionary/contact-dictionary";
import GroupMessages from "./pages/app/provider/communication/group-messages/group-messages";
import ProviderTasks from "./pages/app/provider/communication/tasks/index";
import Documentation from "./pages/app/provider/documents/documentation";
import ProviderHomePage from "./pages/app/provider/home";
import AddPatientPage from "./pages/app/provider/patient/add-patient/add-patient-tab";
import IndividualPatientDetails from "./pages/app/provider/patient/patient-details/individualPatientDetails";
import PatientList from "./pages/app/provider/patient/patientList";
import ProviderSettings from "./pages/app/provider/settings/provider-settings/provider-settings";
import EnterOTP from "./pages/auth/enter-otp";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import LoginPage from "./pages/auth/login";
import LogoutPage from "./pages/auth/logout";
import ResetPasswordPage from "./pages/auth/reset-password";
import SignUp from "./pages/auth/sign-up";
import PrivateRoute from "./route/private-route";
import PublicRoute from "./route/public-route";
import ProviderScheduling from "./pages/app/provider/appointment/calendar/index";

import FolderItems from "./pages/app/provider/documents/folder-items/folder-item";
import ProviderProfileDetails from "./pages/app/provider/profile/provider-profile";
import { PORTAL } from "./constants/provider";
import AnalyticReports from "./pages/app/admin/analytic-reports/analyticReports";
import { useEffect, useState } from "react";
import CompleteCheckIn from "./pages/app/provider/appointment/complete-check-in/complete-check-in";
import UnsignedVisit from "./pages/app/provider/unsigned-visit/unsigned-visit";
import { isNavalaCare } from "./components/common/helper";
import CompleteCheckInCare from "./pages/app/provider/appointment/complete-check-in/CompleteCheckInCare";
import Draggable from "react-draggable";
import DragIndicatorSharpIcon from "@mui/icons-material/DragIndicatorSharp";
import { Box } from "@mui/material";
import WaitingRoom from "./pages/app/provider/appointment/appointment-video-room/zoom-integration/video-content/waiting-room";
import JoinVideo from "./pages/app/provider/appointment/appointment-video-room/zoom-integration/video-content/join-video";
import Loader from "./components/common/spinner/loader";
import ReportsIndex from "./pages/app/provider/reports";
import IntakeFormWindow from "./pages/app/provider/settings/provider-settings/appointment.tsx/macros/form-builder/intake-form/intake-form-window";
import PatientCardDetails from "./pages/app/provider/patient/patient-details/patient-chart-sidebar-components/card-details/patient-card-details";
import CardDetailsComponent from "./pages/app/provider/patient/patient-details/patient-chart-sidebar-components/card-details/card-details";
import NavigateToMobile from "./pages/app/provider/patient/patient-details/patient-chart-sidebar-components/card-details/navigate-to-mobile";
import StaffSettingsPage from "./pages/app/provider/profile/staff-profile";
import ProviderCommonDashboard from "./pages/app/provider/home/provider-common-dasboard";

function App() {
  const [iframeLoading, setIframeLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  if (window.location.hostname) {
    const isCarePortal = window.location.hostname?.includes("navalacare");
    if (isCarePortal) {
      document.title = "Navala Care";
    }
  }
  const handleStop = (event: any, dragElement: any) => {
    event;
    localStorage.setItem("x", dragElement.x);
    localStorage.setItem("y", dragElement.y);
  };
  useEffect(() => {
    if (location.pathname === "/provider") {
      navigate("/provider/appointment/calendar");
    } else if (location.pathname === "/admin") {
      navigate("/admin/provider-groups");
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIframeLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Draggable onStop={handleStop} bounds="body">
          <Box
            id="parent"
            style={{
              display: "none",
              position: "absolute",
              zIndex: 1101,
            }}
          >
            <DragIndicatorSharpIcon
              id="dragIcon"
              style={{
                display: "none",
                cursor: "grab",
                color: "white",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                zIndex: "500000",
                position: "absolute",
                top: "450px",
                left: "900px",
              }}
            >
              {<Loader isLoading={iframeLoading} />}
            </Box>
            <iframe
              id="iFrame"
              style={{
                display: "none",
                position: "absolute",
                zIndex: 1101,
              }}
            ></iframe>
          </Box>
        </Draggable>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth">
            <Route
              path="login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="forgot-password"
              element={
                <PublicRoute>
                  <ForgotPasswordPage />
                </PublicRoute>
              }
            />
            <Route
              path="logout"
              element={<LogoutPage openLogoutModal={false} />}
            />
            <Route path="enter-otp/:email" element={<EnterOTP />} />
            <Route
              path="reset-password/:email"
              element={<ResetPasswordPage />}
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="cards/:uuid/:token" element={<NavigateToMobile />} />
          </Route>

          <Route path="/admin">
            <Route
              path="dashboard"
              element={
                <PrivateRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
                  <AdminDashboardPage />
                </PrivateRoute>
              }
            />

            <Route path="provider-groups">
              <Route
                index
                element={
                  <PrivateRoute>
                    <AdminProviderGroupsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <PrivateRoute>
                    <AdminProviderGroupPage />
                  </PrivateRoute>
                }
              >
                <Route
                  path="profile"
                  element={
                    <PrivateRoute>
                      <ProviderGroupProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="locations"
                  element={
                    <PrivateRoute>
                      <ProviderGroupLocations />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="departments"
                  element={
                    <PrivateRoute>
                      <ProviderGroupDepartment
                        type={Departments.ALL_DEPARTMENT}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="patients"
                  element={
                    <PrivateRoute>
                      <ProviderGroupPatientPage type={Patients.ALL_PATIENTS} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <PrivateRoute>
                      <ProviderGroupUsersPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path=":id">
                <Route
                  path="users/staff-details"
                  element={
                    <PrivateRoute>
                      <ViewAdminProviderGroupStaffDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="users/provider-details"
                  element={
                    <PrivateRoute>
                      <ViewAdminProviderGroupProviderDetails />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path=":id">
                <Route
                  path="locations/provider-details"
                  element={
                    <PrivateRoute>
                      <ViewAdminProviderGroupProviderDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="locations/staff-details"
                  element={
                    <PrivateRoute>
                      <ViewAdminProviderGroupProviderDetails />
                    </PrivateRoute>
                  }
                />
              </Route>
              ProviderTasks
              <Route
                path="{id}/locations"
                element={
                  <PrivateRoute>
                    <AdminProviderGroupsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="{id}/departments"
                element={
                  <PrivateRoute>
                    <AdminProviderGroupsPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="master"
              element={
                <PrivateRoute>
                  <MasterIndex />
                </PrivateRoute>
              }
            >
              <Route
                path=""
                element={
                  <PrivateRoute>
                    <MasterIndex />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="analytic-reports"
              element={
                <PrivateRoute>
                  <AnalyticReports />
                </PrivateRoute>
              }
            />
            <Route path="settings">
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <AdminSettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="user-setting"
                element={
                  <PrivateRoute>
                    <UserSettingsMainComponent />
                  </PrivateRoute>
                }
              >
                <Route
                  path="users"
                  element={
                    <PrivateRoute>
                      <UserSettingsMainComponent />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="roles-and-responsibilities"
                  element={
                    <PrivateRoute>
                      <UserSettingsMainComponent />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route
                path="admin-user"
                element={
                  <PrivateRoute>
                    <AdminUser />
                  </PrivateRoute>
                }
              />
              <Route
                path="roles-responsibility"
                element={
                  <PrivateRoute>
                    <RoleIndex />
                  </PrivateRoute>
                }
              />
              <Route
                path="audit-log"
                element={
                  <PrivateRoute>
                    <AuditLog />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          <Route path="/provider">
            <Route
              path="home"
              element={
                <PrivateRoute allowedRoles={["PROVIDER"]}>
                  {/* <ProviderHomePage /> */}
                  <ProviderCommonDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  {sessionStorage.getItem("role") !== "PROVIDER" ? (
                    <StaffSettingsPage />
                  ) : (
                    <ProviderProfileDetails />
                  )}
                </PrivateRoute>
              }
            />

            <Route
              path="appointment/calendar"
              element={
                <PrivateRoute>
                  <ProviderScheduling />
                </PrivateRoute>
              }
            />
            <Route
              path="appointment/calendar/complete-intake"
              element={
                <PrivateRoute>
                  {!isNavalaCare() ? (
                    <CompleteCheckIn />
                  ) : (
                    <CompleteCheckInCare />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="documents"
              element={
                <PrivateRoute portalType={PORTAL.NAVALACARE}>
                  <Documentation />
                </PrivateRoute>
              }
            />
            <Route path="documents/folder-item" element={<FolderItems />} />

            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <ProviderSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="settings/provider-profile"
              element={
                // <PrivateRoute>
                <ProviderProfileDetails />
                // </PrivateRoute>
              }
            />
            <Route path="settings/intake-form" element={<IntakeFormWindow />} />
            <Route
              path="unsigned-visit"
              element={
                <PrivateRoute>
                  <UnsignedVisit />
                </PrivateRoute>
              }
            />
            <Route
              path="reports"
              element={
                <PrivateRoute>
                  <ReportsIndex />
                </PrivateRoute>
              }
            />
            <Route path="communications">
              <Route
                path="contact-dictionary"
                element={
                  <PrivateRoute>
                    <ContactDictionary />
                  </PrivateRoute>
                }
              />
              <Route
                path="group-messages"
                element={
                  <PrivateRoute>
                    <GroupMessages />
                  </PrivateRoute>
                }
              />
              <Route path="tasks" element={<ProviderTasks />} />
            </Route>
            <Route
              path="patients"
              element={
                <PrivateRoute>
                  <PatientList />
                </PrivateRoute>
              }
            />
            <Route
              path="add-patient"
              element={
                <PrivateRoute>
                  <AddPatientPage />
                </PrivateRoute>
              }
            />
            <Route
              path="patient-details"
              element={
                <PrivateRoute>
                  <IndividualPatientDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="waiting-room/:uuid/:apptId"
              element={
                // <PrivateRoute>
                <WaitingRoom />
                // </PrivateRoute>
              }
            />
            <Route
              path="join-room/:uuid"
              element={
                <PrivateRoute>
                  <JoinVideo />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
