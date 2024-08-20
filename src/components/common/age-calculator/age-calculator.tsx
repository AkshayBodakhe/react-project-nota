import React, { useEffect, useState } from "react";

const AgeCalculator: React.FC<{ birthdate: string }> = ({ birthdate }) => {
  const birthdateDate = new Date(birthdate);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const calculateAge = () => {
      const currentDate = new Date();
      const yearsDiff =
        currentDate.getUTCFullYear() - birthdateDate.getUTCFullYear();

      const hasBirthdayOccurred =
        currentDate.getUTCMonth() > birthdateDate.getUTCMonth() ||
        (currentDate.getUTCMonth() === birthdateDate.getUTCMonth() &&
          currentDate.getUTCDate() >= birthdateDate.getUTCDate());
      const finalAge = hasBirthdayOccurred ? yearsDiff : yearsDiff - 1;

      setAge(finalAge);
    };

    calculateAge();
  }, [birthdateDate]);

  return <span>{age !== null ? <span>{age}</span> : ""}</span>;
};

export default AgeCalculator;
