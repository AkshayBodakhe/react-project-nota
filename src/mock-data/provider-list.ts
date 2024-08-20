
export const data: any[] = [
    {
        providerName: 'Harry Potter',
        location: '23 Main Street, New York, NY 10001',
        contact: '123-456-7890',
        email: 'abc@example.com',
        specialities: ['Pediatrics', 'Internal Medicine'],
    },
    {
        providerName: 'Hermione Granger',
        location: '456 Elm Avenue, Los Angeles, CA 90001',
        contact: '555-555-5555',
        email: 'xyz@example.com',
        specialities: ['Cardiology', 'Dermatology'],
    },
    {
        providerName: 'Ron Weasley',
        location: '789 Oak Road, San Francisco, CA 94101',
        contact: '987-654-3210',
        email: 'tech@example.com',
        specialities: ['Orthopedics', 'Pediatrics'],
    },
    {
        providerName: 'Albus Dumbledore',
        location: '10 Baker, London W1U 3AA, United Kingdom',
        contact: '+44 20 1234 5678',
        email: 'info@globalservices.com',
        specialities: ['Oncology', 'Radiology'],
    },
    {
        providerName: 'Severus Snape',
        location: '23 Main Street, New York, NY 10001',
        contact: '777-888-9999',
        email: 'info@dataexperts.com',
        specialities: ['Psychiatry', 'Pediatrics'],
    },
    {
        providerName: 'Luna Lovegood',
        location: '456 Elm Avenue, Los Angeles, CA 90001',
        contact: '+49 30 1234567',
        email: 'contact@innovate.com',
        specialities: ['Ophthalmology', 'Pediatrics'],
    },
    {
        providerName: 'Sirius Black',
        location: '789 Oak Road, San Francisco, CA 94101',
        contact: '408-555-1234',
        email: 'info@techinnovators.com',
        specialities: ['Urology', 'Hematology'],
    },
    {
        providerName: 'Minerva McGonagall',
        location: '10 Baker, London W1U 3AA, United Kingdom',
        contact: '+65 9876 5432',
        email: 'support@digitalsolutions.com',
        specialities: ['Pediatrics', 'Dermatology'],
    },
    {
        providerName: 'Rubeus Hagrid',
        location: '10 Baker, London W1U 3AA, United Kingdom',
        contact: '+61 2 1234 5678',
        email: 'contact@webservicesgroup.com',
        specialities: ['Allergy & Immunology', 'Cardiology'],
    },
    {
        providerName: 'Ginny Weasley',
        location: '23 Main Street, New York, NY 10001',
        contact: '416-555-6789',
        email: 'info@creativeminds.com',
        specialities: ['Dentistry', 'Cardiology'],
    }
]

export const providerList = (filterBy: string, value: string) => {
    if (value === 'all-speciality' || value === 'all-providers') return data;
    else if (filterBy === 'speciality') {
        return data.filter((val: any) => val.specialities.includes(value));
    } else if (filterBy === 'provider') {
        return data.filter((provider: any) => provider?.providerName.trim().toLowerCase() === value.trim().toLowerCase());
    }
    return data;
};
