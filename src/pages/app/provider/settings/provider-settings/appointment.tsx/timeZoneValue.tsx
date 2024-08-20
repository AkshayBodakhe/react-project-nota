import * as moment from 'moment-timezone';

export const getTimeZoneValue = (key:any) => {
  switch (key) {
    case "PST":
      return "America/Los_Angeles";
    case "CST":
      return "America/Chicago";
    case "IST":
      return "Asia/Kolkata";
    case "AST":
      return "America/Halifax";
    case "EST":
      return "America/New_York";
    case "MST":
      return "America/Denver";
    case "HST":
      return "Pacific/Honolulu";
    case "PDT":
      return "America/Los_Angeles";
    case "CDT":
      return "America/Chicago";
    case "EDT":
      return "America/New_York";
    case "ADT":
      return "America/Halifax";
    case "MDT":
      return "America/Denver";
    case "NDT":
      return "America/St_Johns";
    case "VET":
      return "America/Caracas";
    default:
      return key;
  }
};

export const convertLocalToUTC = (localDateTimeString:any, timeZoneKey:any) => {
    const timeZoneValue = getTimeZoneValue(timeZoneKey);
    // if (!timeZoneValue) {
    //   throw new Error(`Timezone value not found for key: ${timeZoneKey || ""}`);
    // }
  
    const localMoment = moment.utc(localDateTimeString);
  
    const utcMoment = localMoment.tz(timeZoneValue);
  
    const utcDateTimeString = utcMoment?.format('YYYY-MM-DD HH:mm:ss');

    return utcDateTimeString;
  };
