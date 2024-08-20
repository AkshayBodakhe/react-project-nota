import { AccountsType } from "../pages/app/provider/common-files/enums"

export const listing = (type: AccountsType) => {
    return [
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
        {
            [type === 'Patient' ? 'superBillId' : 'claimNumber'] : "93683",
            [type === 'Patient' ? 'dateOfService' : 'patientName'] : [type === 'Patient' ? "21 Oct 2023" : 'Annie Effertz'],
            [type === 'Patient' ? 'dateOfBilling' : 'dateOfService'] : '16 Dec 2023',
            [type === 'Patient' ? 'billAmount' : 'dateOfBilling'] : [type === 'Patient' ? "$ 363" : '16 Dec 2023'],
            [type === 'Patient' ? 'claimAmount' : 'submissionDate'] : [type === 'Patient' ? "$ 77" : '21 Oct 2023'],
            [type === 'Patient' ? 'claimPaid' : 'billAmount'] : [type === 'Patient' ? "$ 210" : '$ 320'],
            [type === 'Patient' ? 'coPay' : 'claimAmount'] : [type === 'Patient' ? "$ 10" : '$ 92'],
            [type === 'Patient' ? 'coPayPaid' : 'paidAmount'] : [type === 'Patient' ? "$ 90" : '$ 109'],            
            [type === 'Patient' ? 'balanceAmount' : 'balanceAmount'] : [type === 'Patient' ? "$ 310" : '$ 420']
        },
    ]
}