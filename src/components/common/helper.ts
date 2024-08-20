export const transformText = (text: any)  => {
    if (text) {
      return text
        ?.split("_")
        ?.map(
          (word: any) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        ?.join(" ");
    }
  }


  export const  findUnionById = (array1: any[] = [], array2: any[] = [], property: string = 'uuid') => {
    // Combine the arrays
    const combinedArray = array1.concat(array2);
  
    // Use Set to store unique objects based on the specified property
    const uniqueObjects = new Set();
  
    // Filter the combined array to include only unique objects based on the property
    const unionArray = combinedArray.filter(obj => {
      const propertyValue = obj[property];
      if (!uniqueObjects.has(propertyValue)) {
        uniqueObjects.add(propertyValue);
        return true;
      }
      return false;
    });
  
    return unionArray;
  }
  

  export const checkActiveProviderGroup = (data:any) => {
    if(data){
      return !data.active
    }
    return true
  }

  export const calculateDOB = (dob: any) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age} yrs`;
  };

  export const generateUniqueId = () => Date.now() + Math.random().toString(36).substr(2, 9);

  export const isNavalaCare = () => {
    if (window.location.hostname) {
      const isCarePortal = window.location.hostname?.includes("navalacare");
     return isCarePortal
    }
  }