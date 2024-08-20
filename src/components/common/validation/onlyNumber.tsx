export const onlyNumber = (inputValue: string) => {
    const numericInput = inputValue.replace(/[^0-9]/g, "");
    // Limit the input to 10 digits
    const limitedInput = numericInput.slice(0, 10);
    return limitedInput;
  };