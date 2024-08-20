
const data = [
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    },
    {
        date: '10-07-2022',
        type: 'Reminder Tasks',
        assignBy: 'Alan Lewis',
        title: 'Office Visit New SOAP Note',
        assignTo: 'Dr. Corina',
        image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: 'Miss Tracy Osinski',
        due: 'Tue Mar 01 2022',
        status: 'Complete',
        priority:"High",
        action: ''
    }
]
export const openTasks = (actionType: string) => {

    return actionType === 'all' || actionType === '' ? data : data.filter((task) => task.action == actionType);
}