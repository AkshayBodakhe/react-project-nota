import AppLayout from '../../../../../components/core/layout/layout';
import { adminConstants } from '../../../../../constants/admin';
import PatientPayment from './patient-payment';
const { PROVIDER } = adminConstants;

function PatientPaymentIndex() {
  return (
    <div>
      <PatientPayment/>
    </div>
  )
}

export default AppLayout(PatientPaymentIndex, { source: PROVIDER });