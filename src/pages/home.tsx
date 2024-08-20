import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Link to="/auth/login">auth login</Link>
      <br />
      <Link to="/auth/forgot-password">auth forgot password</Link>
      <br />
      <Link to="/admin/dashboard">auth logout</Link>
      <br />
      <hr></hr>Admin Portal<hr></hr>
      <Link to="/admin/dashboard">admin dashboard</Link>
      <br />
      <Link to="/admin/provider-groups">admin provider groups</Link>
      <br />
      <Link to="/admin/provider-groups/details/profile">
        admin provider groups profile
      </Link>
      <br />
      <Link to="/admin/provider-groups/details/locations">
        admin provider groups locations
      </Link>
      <br />
      <Link to="/admin/provider-groups/details/departments">
        admin provider groups departments
      </Link>
      <br />
      <Link to="/admin/provider-groups/details/patients">
        admin provider groups patients
      </Link>
      <br />
      <Link to="/admin/provider-groups/details/users">
        admin provider groups users
      </Link>
      <br />
      <Link to="/admin/master/data-import">admin master</Link>
      <br />
      <Link to="/admin/master/data-import">admin master import</Link>
      <br />
      <Link to="/admin/master/catalog/loinc-code">
        admin master catalog loinc code
      </Link>
      <br />
      <Link to="/admin/master/catalog/drug">admin master catalog drug</Link>
      <br />
      <Link to="/admin/master/catalog/icd-10">admin master catalog 10</Link>
      <br />
      <Link to="/admin/master/catalog/cpt">admin master catalog cpt</Link>
      <br />
      <Link to="/admin/master/catalog/hcpcs">admin master catalog hcpcs</Link>
      <br />
      <Link to="/admin/settings">admin settings</Link>
      <br />
      <Link to="/admin/settings/profile">admin settings profile</Link>
      <br />
      <Link to="/admin/settings/user-setting/users">admin settings users</Link>
      <br />
      <Link to="/admin/settings/user-setting/roles-and-responsibilities">
        admin settings roles & responsibilities
      </Link>
      <br /><hr></hr>Provider Portal<hr></hr>
      <Link to="/provider/home">provider dashboard</Link>
      <br />
      <Link to="/provider/appointment/calendar">
        provider appointment calendar
      </Link>
      <br />
      <Link to="/provider/appointment/appointments">
        provider appointment appointments
      </Link>
      <br />
      <Link to="/provider/appointment/availability">
        provider appointment availability
      </Link>
      <br />
      <Link to="/provider/appointment/tasks">
        provider appointment tasks
      </Link>
      <br />
      <Link to="/provider/patients/">provider patients list</Link>
      <br />
      <Link to="/provider/patients/chart">provider patients chart</Link>
      <br />
      <Link to="/provider/patients/consent-forms">provider patients forms</Link>
      <br />
      <Link to="/provider/billing">provider billing</Link>
      <br />
      <Link to="/provider/billing/superbill">provider billing superbill</Link>
      <br />
      <Link to="/provider/billing/account-receiveable">
        provider account receiveables
      </Link>
      <br />
      <Link to="/provider/billing/payment/patient">
        provider payment patient
      </Link>
      <br />
      <Link to="/provider/billing/payment/insurance">
        provider payment insurance
      </Link>
      <br />
      <Link to="/provider/billing/fee-schedule">provider fee schedule</Link>
      <br />
      <Link to="/provider/settings/account">provider settings account</Link>
      <br />
      <Link to="/provider/settings/account/profile">
        provider settings profile
      </Link>
      <br />
      <Link to="/provider/settings/account/provider-group">
        provider settings provider group
      </Link>
      <br />
      <Link to="/provider/settings/account/notification">
        provider settings notification
      </Link>
      <br />
      <Link to="/provider/settings/provider-admin">
        provider settings admin
      </Link>
      <br />
      <Link to="/provider/settings/provider-admin/provider">
        provider settings provider
      </Link>
      <br />
      <Link to="/provider/settings/provider-admin/user">
        provider settings user
      </Link>
      <br />
      <Link to="/provider/settings/provider-admin/templates">
        provider settings templates
      </Link>
      <br />
      <Link to="/provider/settings/provider-admin/master">
        provider settings master
      </Link>
      <br />
      <hr></hr>Patient Portal<hr></hr>
      <Link to="/patient/appointments">patient appointments</Link>
      <br />
      <Link to="/patient/providers">patient providers</Link>
      <br />
      <Link to="/patient/documents">patient documents</Link>
      <br />
      <Link to="/patient/health-record">patient record</Link>
      <br />
      <Link to="/patient/health-record/allergies">patient allergies</Link>
      <br />
      <Link to="/patient/health-record/problems">patient problems</Link>
      <br />
      <Link to="/patient/health-record/medications">patient medications</Link>
      <br />
      <Link to="/patient/health-record/lab-results">patient results</Link>
      <br />
      <Link to="/patient/health-record/visit-history">patient history</Link>
      <br />
      <Link to="/patient/notifications">patient notifications</Link>
      <br />
    </div>
  );
}

export default HomePage;
