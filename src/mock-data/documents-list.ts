export const documentsList = (type: string) => {
    return [
        {
            name: 'Intake Form',
            providerName: 'Harry Potter',
            category: 'Uploaded Document',
            receiveDate: '15-09-2022',
            [type === 'Completed Documents' ? 'dueDate' : 'submitDate']: '26-10-2022'
        },
        {
            name: 'Physical Intake Form',
            providerName: 'Hermione Granger',
            category: 'Intake Form',
            receiveDate: '18-12-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '10-11-2022'
        },
        {
            name: 'Blood Report',
            providerName: 'Ron Weasley',
            category: 'Uploaded Document',
            receiveDate: '15-09-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '11-06-2022'
        },
        {
            name: 'Physical Consent Form',
            providerName: 'Albus Dumbledore',
            category: 'Intake Form',
            receiveDate: '18-12-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '05-12-2022'
        },
        {
            name: 'Physical Exam Form',
            providerName: 'Severus Snape',
            category: 'Uploaded Document',
            receiveDate: '15-09-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '01-01-2022'
        },
        {
            name: 'Intake Form',
            providerName: 'Harry Potter',
            category: 'Uploaded Document',
            receiveDate: '18-12-2022',
            [type === 'Completed Documents' ? 'dueDate' : 'submitDate']: '26-10-2022'
        },
        {
            name: 'Physical Intake Form',
            providerName: 'Hermione Granger',
            category: 'Intake Form',
            receiveDate: '12-06-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '10-11-2022'
        },
        {
            name: 'Blood Report',
            providerName: 'Ron Weasley',
            category: 'Uploaded Document',
            receiveDate: '15-09-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '11-06-2022'
        },
        {
            name: 'Physical Consent Form',
            providerName: 'Albus Dumbledore',
            category: 'Intake Form',
            receiveDate: '12-06-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '05-12-2022'
        },
        {
            name: 'Physical Exam Form',
            providerName: 'Severus Snape',
            category: 'Uploaded Document',
            receiveDate: '15-09-2022',
            [type == 'Completed Documents' ? 'dueDate' : 'submitDate']: '01-01-2022'
        }
    ]
}