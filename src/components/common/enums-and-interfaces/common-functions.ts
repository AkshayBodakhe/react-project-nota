import { ProviderGroupControllerService } from "../../../sdk/thinkemr-core-0.0.1/requests";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getLoggedInUser() {
  const encodedData = sessionStorage.getItem("loginUser") || "";
  try {
    return JSON.parse(encodedData) || false;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return false;
  }
}

function convertToUTCFormat(date: any) {
  const newDate = new Date(date);
  return newDate.toUTCString();
}

function convertUTCDateToLocalDate(date: any) {
  const newDate = new Date(date + "Z");
  return newDate.toString();
}

//prevent special charcters but allow space
const handleKeyPress = (e: any) => {
  const keyCode = e.keyCode || e.which;
  const isValidKey = /^[a-zA-Z0-9\s/]+$/.test(String.fromCharCode(keyCode));
  if (!isValidKey) {
    e.preventDefault();
  }
};

const formatDate = (inputDate: any) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;
  return formattedDate;
};

const capitalizeInitial = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (char: any) => char.toUpperCase());
};

const getAllLanguages = async () => {
  const countryList = await ProviderGroupControllerService.getAllLanguages();
  return countryList;
};

const mmddyyFormat = (dateString: string) => {
  if(dateString){
    const dateParts = dateString?.split(/[T\-:]/);
    const year = dateParts && dateParts[0] ? dateParts[0]?.slice(2) : null;
    const month = dateParts && dateParts[1] ? dateParts[1] : null;
    const day = dateParts && dateParts[2] ? dateParts[2] : null;
    return `${month}/${day}/${year}`;
  } 
};

const calculateAge = (dobString:string) => {
  const dob = new Date(dobString);
  const now = new Date();

  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      age--;
  }

  return age;
}

export {
  capitalizeFirstLetter,
  getLoggedInUser,
  convertUTCDateToLocalDate,
  convertToUTCFormat,
  handleKeyPress,
  formatDate,
  capitalizeInitial,
  getAllLanguages,
  mmddyyFormat,
  calculateAge
};
