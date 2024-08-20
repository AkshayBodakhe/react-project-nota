export function capitalizeFirstLetter(str: string) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
}

export function customSortDays(a: any, b: any,isLowerCase: boolean) {
    let days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    if(isLowerCase) days = days.map((day) => day.toLowerCase());
    return days.indexOf(a) - days.indexOf(b);
};

export  function convertTo12HourFormat(time: any) {
    const [hours, minutes] = time?.split(':');
    const date = new Date(0, 0, 0, hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}