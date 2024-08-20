export function epochToDateConverter(epoch: any) {
    if (!epoch) return null;
    const date = new Date(epoch);
    const options: object = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return date.toLocaleString('en-US', options);
}
