import { Column } from "../components/common/enums-and-interfaces/interfaces"

export enum HealthRecordType {
    ALLERGIES = 'allergies',
    PROBLEMS = 'problems',
    MEDICATIONS = 'medications',
    LAB_RESULTS = 'lab-results',
    VISIT_HISTORY = 'visit-history'
}

const allergiesCols: Column[] = [
    { id: 'allergies', label: 'Allergies', minWidth: 150, displaySort: false },
    { id: 'provider', label: 'Provider', minWidth: 150, displaySort: false },
    { id: 'reaction', label: 'Reaction', minWidth: 150, displaySort: false },
    { id: 'note', label: 'Note', minWidth: 150, displaySort: false }
]

const problemsCols: Column[] = [
    { id: 'problems', label: 'Problems', minWidth: 150, displaySort: false },
    { id: 'provider', label: 'Provider', minWidth: 150, displaySort: false },
    { id: 'type', label: 'Type', minWidth: 150, displaySort: false },
    { id: 'note', label: 'Note', minWidth: 150, displaySort: false }
]

const medicationCols: Column[] = [
    { id: 'medication', label: 'Medication', minWidth: 150, displaySort: false },
    { id: 'prescriber', label: 'Prescriber', minWidth: 150, displaySort: false },
    { id: 'note', label: 'Note', minWidth: 150, displaySort: false },
]

const labResultsCols: Column[] = [
    { id: 'labDescription', label: 'Lab Description', minWidth: 150, displaySort: false },
    { id: 'provider', label: 'Provider', minWidth: 150, displaySort: false },
    { id: 'note', label: 'Note', minWidth: 150, displaySort: false },
]

const visitHistoryCols: Column[] = [
    { id: 'dateAndTime', label: 'Date & Time', minWidth: 100, displaySort: false },
    { id: 'providerName', label: 'Provider Name', minWidth: 150, displaySort: false },
    { id: 'visitType', label: 'Visit Type', minWidth: 150, displaySort: false },
    { id: 'location', label: 'Location', minWidth: 150, displaySort: false },
    { id: 'reasonForVisit', label: 'Reason For Visit', minWidth: 150, displaySort: false },
    { id: 'action', label: 'Action', minWidth: 150, displaySort: false }
]

const allergiesData: any[] = [
    {
        allergies: 'Cigarette smoke',
        provider: 'Ross Geller',
        reaction: 'Tightness In Breathing',
        note: '-'
    },
    {
        allergies: 'Milk',
        provider: 'Monica Geller',
        reaction: 'Cough',
        note: '-'
    },
    {
        allergies: 'Dust',
        provider: 'Chandler Bing',
        reaction: 'Vomit',
        note: '-'
    },
    {
        allergies: 'People',
        provider: 'Joey Tribbiani',
        reaction: 'Tightness In Breathing',
        note: '-'
    },
    {
        allergies: 'Kindness',
        provider: 'Phoebe Buffay',
        reaction: 'Vomit',
        note: '-'
    },
    {
        allergies: 'Cigarette smoke',
        provider: 'Ross Geller',
        reaction: 'Tightness In Breathing',
        note: '-'
    },
    {
        allergies: 'Milk',
        provider: 'Monica Geller',
        reaction: 'Cough',
        note: '-'
    },
    {
        allergies: 'Dust',
        provider: 'Chandler Bing',
        reaction: 'Vomit',
        note: '-'
    },
    {
        allergies: 'People',
        provider: 'Joey Tribbiani',
        reaction: 'Tightness In Breathing',
        note: '-'
    },
    {
        allergies: 'Kindness',
        provider: 'Phoebe Buffay',
        reaction: 'Vomit',
        note: '-'
    }
];

const problemsData: any[] = [
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Rachel Green",
        type: "Type A",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Ross Geller",
        type: "Type B",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Monica Geller",
        type: "Type C",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Chandler Bing",
        type: "Type D",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Joey Tribbiani",
        type: "Type E",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Phoebe Buffay",
        type: "Type F",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Gunther",
        type: "Type G",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Rachel Green",
        type: "Type H",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Ross Geller",
        type: "Type I",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        problems: "iA159- Respiratory tuberculosis unspecified",
        provider: "Monica Geller",
        type: "Type J",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
]

const medicationData: any[] = [
    {
        medication: "Antibiotics",
        prescriber: "Dr. Smith",
        note: "Take with food, twice a day."
    },
    {
        medication: "Painkillers",
        prescriber: "Dr. Johnson",
        note: "Avoid alcohol while taking."
    },
    {
        medication: "Blood Pressure Medication",
        prescriber: "Dr. Williams",
        note: "Check blood pressure daily."
    },
    {
        medication: "Insulin",
        prescriber: "Endocrinologist",
        note: "Inject before meals."
    },
    {
        medication: "Antidepressants",
        prescriber: "Psychiatrist",
        note: "Take in the evening."
    },
    {
        medication: "Allergy Medication",
        prescriber: "Allergist",
        note: "Avoid allergens."
    },
    {
        medication: "Pain Relief Cream",
        prescriber: "Orthopedic Surgeon",
        note: "Apply to affected area."
    },
    {
        medication: "Antacids",
        prescriber: "Gastroenterologist",
        note: "Take as needed for heartburn."
    },
    {
        medication: "Vitamin D Supplements",
        prescriber: "General Practitioner",
        note: "Take one daily."
    },
    {
        medication: "Inhaler",
        prescriber: "Pulmonologist",
        note: "Use as directed for asthma."
    }
]

const labResultData: any[] = [
    {
        labDescription: "Complete Blood Count (CBC)",
        provider: "ABC Medical Lab",
        note: "Fasting required for accurate results."
    },
    {
        labDescription: "Lipid Profile",
        provider: "XYZ Diagnostics",
        note: "Avoid fatty foods 12 hours before the test."
    },
    {
        labDescription: "Liver Function Tests (LFTs)",
        provider: "LMN Labs",
        note: "No specific preparation needed."
    },
    {
        labDescription: "Thyroid Function Panel",
        provider: "PQR Health Services",
        note: "Take medication as usual before the test."
    },
    {
        labDescription: "Urine Analysis",
        provider: "DEF Medical Lab",
        note: "Collect the first morning urine sample."
    },
    {
        labDescription: "Glucose Tolerance Test (GTT)",
        provider: "EFG Diagnostics",
        note: "Fast overnight before the test."
    },
    {
        labDescription: "Hemoglobin A1c (HbA1c)",
        provider: "HIJ Labs",
        note: "No fasting required for this test."
    },
    {
        labDescription: "Allergy Panel",
        provider: "RST Allergy Clinic",
        note: "Discuss any known allergies with the provider."
    },
    {
        labDescription: "C-Reactive Protein (CRP)",
        provider: "CDE Medical Lab",
        note: "No special preparation needed."
    },
    {
        labDescription: "Bone Density Scan (DEXA)",
        provider: "UVW Radiology Center",
        note: "Wear comfortable clothing without metal."
    }
]


const visitHistoryData: any[] = [
    {
        dateAndTime: "2023-10-15 09:00 AM",
        providerName: "Dr. Smith",
        visitType: "Primary Care",
        location: "City Hospital",
        reasonForVisit: "Annual check-up"
    },
    {
        dateAndTime: "2023-10-20 02:30 PM",
        providerName: "Dr. Johnson",
        visitType: "Dermatology",
        location: "Skin Clinic",
        reasonForVisit: "Skin rash"
    },
    {
        dateAndTime: "2023-10-25 11:15 AM",
        providerName: "Dr. Williams",
        visitType: "Cardiology",
        location: "Heart Center",
        reasonForVisit: "Chest pain"
    },
    {
        dateAndTime: "2023-11-05 03:45 PM",
        providerName: "Dr. Davis",
        visitType: "Orthopedics",
        location: "Ortho Clinic",
        reasonForVisit: "Knee pain"
    },
    {
        dateAndTime: "2023-11-10 10:30 AM",
        providerName: "Dr. Patel",
        visitType: "Gastroenterology",
        location: "Gastro Clinic",
        reasonForVisit: "Digestive issues"
    },
    {
        dateAndTime: "2023-11-15 01:20 PM",
        providerName: "Dr. Miller",
        visitType: "Ophthalmology",
        location: "Eye Clinic",
        reasonForVisit: "Blurry vision"
    },
    {
        dateAndTime: "2023-11-25 09:45 AM",
        providerName: "Dr. Lee",
        visitType: "ENT",
        location: "ENT Clinic",
        reasonForVisit: "Sinus infection"
    },
    {
        dateAndTime: "2023-12-05 04:00 PM",
        providerName: "Dr. Turner",
        visitType: "Dentistry",
        location: "Dental Clinic",
        reasonForVisit: "Toothache"
    },
    {
        dateAndTime: "2023-12-10 11:50 AM",
        providerName: "Dr. Wilson",
        visitType: "Psychiatry",
        location: "Psych Clinic",
        reasonForVisit: "Anxiety and depression"
    },
    {
        dateAndTime: "2023-12-15 02:15 PM",
        providerName: "Dr. Garcia",
        visitType: "Urology",
        location: "Uro Clinic",
        reasonForVisit: "Urinary tract infection"
    }
]


export const healthRecords = (type: HealthRecordType) => {
    switch (type) {
        case HealthRecordType.ALLERGIES: return allergiesData;
        case HealthRecordType.PROBLEMS: return problemsData;
        case HealthRecordType.MEDICATIONS: return medicationData;
        case HealthRecordType.LAB_RESULTS: return labResultData;
        case HealthRecordType.VISIT_HISTORY: return visitHistoryData;
        default:
            break;
    }
    return [];
}

export const healthRecordsColumns = (type: HealthRecordType) => {
    switch (type) {
        case HealthRecordType.ALLERGIES: return allergiesCols;
        case HealthRecordType.PROBLEMS: return problemsCols;
        case HealthRecordType.MEDICATIONS: return medicationCols;
        case HealthRecordType.LAB_RESULTS: return labResultsCols;
        case HealthRecordType.VISIT_HISTORY: return visitHistoryCols;
        default:
            break;
    }
    return [];

}