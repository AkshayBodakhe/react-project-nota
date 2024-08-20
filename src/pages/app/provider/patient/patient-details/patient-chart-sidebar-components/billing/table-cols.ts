import { PatientBillingType } from "../enums-interfaces/enums";

const encountersForBilling = [
    { id: 'serviceId', label: 'Service ID', minWidth: 50 },
    { id: 'dateOfService', label: 'Date Of Service', minWidth: 200 },
    { id: 'visitTypes', label: 'Visit Types', minWidth: 200 },
    { id: 'reasoon', label: 'Reason For Visit', minWidth: 200 },
    { id: 'provider', label: 'Rendering Provider', minWidth: 200 },
    { id: 'place', label: 'Place Of Service', minWidth: 200 },
    { id: 'action', label: 'Action', minWidth: 100 }
]

const superBill = [
    { id: 'billId', label: 'Bill ID', minWidht: 50 },
    { id: 'billDate', label: 'Bill Date', minWidht: 200 },
    { id: 'dateOfService', label: 'Date Of Service', minWidht: 200 },
    { id: 'renderingProvider', label: 'Rendering Provider', minWidht: 200 },
    { id: 'totalAmount', label: 'Total Amount', minWidht: 200 },
    { id: 'insuranceBalance', label: 'Insurance Balance', minWidht: 200 },
    { id: 'paid', label: 'Patient Paid', minWidht: 200 },
    { id: 'balance', label: 'Patient Balance', minWidht: 200 },
    { id: 'status', label: 'Status', minWidht: 200 },
    { id: 'action', label: 'Action', minWidht: 100 },
]

const claims = [
    { id: 'claimId', label: 'Claim ID', minWidth: 50 },
    { id: 'bllId', label: 'Bill ID', minWidth: 50 },
    { id: 'dateOfService', label: 'Date Of Service', minWidth: 100 },
    { id: 'payerName', label: 'Payer Name', minWidth: 100 },
    { id: 'provider', label: 'Rendering Provider', minWidth: 100 },
    { id: 'billedAs', label: 'Billed As', minWidth: 100 },
    { id: 'amount', label: 'Insurance Amount', minWidth: 100 },
    { id: 'updatedDate', label: 'Updated Date', minWidth: 100 },
    { id: 'claimStatus', label: 'Claim Status', minWidth: 100 },
    { id: 'transactionStatus', label: 'Transaction Status', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 50 }
]

const receipts = [
    { id: 'paymentDate', label: 'Payment Date', minWidth: 100 },
    { id: 'receipt', label: 'Receipt #', minWidth: 100 },
    { id: 'providerName', label: 'Provider Name', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 70 },
    { id: 'paymentMethod', label: 'Payment Method', minWidth: 70 },
    { id: 'paymentFrom', label: 'Payment From', minWidth: 100 },
    { id: 'refundAmount', label: 'Refund Amount', minWidth: 70 },
    { id: 'unusedPayment', label: 'Unused Payment', minWidth: 70 },
    { id: 'action', label: 'Action', minWidth: 50 }
]

const patientPayment = [
    { id: 'visitId', label: 'Visit ID', minWidth: 100 },
    { id: 'superbillId', label: 'Superbill ID', minWidth: 100 },
    { id: 'paymentId', label: 'Payment ID', minWidth: 100 },
    { id: 'paymentMethod', label: 'Payment Method', minWidth: 100 },
    { id: 'transitionId', label: 'Transition ID', minWidth: 100 },
    { id: 'transitionDate', label: 'Transition Date', minWidth: 100 },
    { id: 'paidAmount', label: 'Paid Amount', minWidth: 100 },
    { id: 'appliedAmount', label: 'Applied Amount', minWidth: 100 },
    { id: 'unappliedAmount', label: 'Unapplied Amount', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
]

const insurancePayment = [
    { id: 'visitId', label: 'Visit ID', minWidth: 100 },
    { id: 'payerName', label: 'Payer Name', minWidth: 100 },
    { id: 'providerName', label: 'Provider Name', minWidth: 100 },
    { id: 'paymentId', label: 'Payment ID', minWidth: 100 },
    { id: 'transitionId', label: 'Transition ID', minWidth: 100 },
    { id: 'paymentMethod', label: 'Payment Method', minWidth: 100 },
    { id: 'transitionDate', label: 'Transition Date', minWidth: 100 },
    { id: 'paidAmount', label: 'Paid Amount', minWidth: 100 },
    { id: 'appliedAmount', label: 'Applied Amount', minWidth: 100 },
    { id: 'unappliedAmount', label: 'Unapplied Amount', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
]

export const cols = (type: PatientBillingType) => {
    switch (type) {
        case PatientBillingType.ENCOUNTERS_FOR_BILLING:
            return encountersForBilling;
        case PatientBillingType.SUPER_BILL:
            return superBill;
        case PatientBillingType.CLAIMS:
            return claims;
        case PatientBillingType.RECEIPTS:
            return receipts;
        case PatientBillingType.PATIENT_PAYMENT:
            return patientPayment;
        case PatientBillingType.INSURANCE_PAYMENT:
            return insurancePayment;
        default:
            return;
    }
}