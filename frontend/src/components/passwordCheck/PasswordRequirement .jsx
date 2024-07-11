import React from "react";
import RequirementCard from "./RequirementCard ";
const PasswordRequirement = ({ password }) => {
  const passwordString = typeof password === "string" ? password : "";

  const hasPsValue = passwordString.trim() !== "";
  const hasAtLeast6Chars = passwordString.length >= 6;
  const hasPsNumber = /\d/.test(passwordString);
  const hasPsSmallCase = /[a-z]/.test(passwordString);

  // maybe for another projects..:)
  // const hasPsassword7chars = passwordString.length > 6;
  // const hasPsUpperCase = /[A-Z]/.test(passwordString);
  // const hasPsSymbol = /\W|_/g.test(passwordString);

  return (
    <div className="flex flex-col w-350px h-130px p-1 rounded-md bg-slate-100">
      <RequirementCard text="Required!" hasPassed={hasPsValue} />
      <RequirementCard
        text="At least 6 characters"
        hasPassed={hasAtLeast6Chars}
      />
      <RequirementCard text="At least one number" hasPassed={hasPsNumber} />
      <RequirementCard
        text="At least one lowercase letter"
        hasPassed={hasPsSmallCase}
      />
      {/* No need to do more  this is enough for this project )
        <RequirementCard
          text="At least seven characters"
          hasPassed={hasPsassword7chars}
        />
        <RequirementCard
          text="At least one uppercase letter"
          hasPassed={hasPsUpperCase}
        />
        <RequirementCard
          text="At least one special character (symbol)"
          hasPassed={hasPsSymbol}
        />
        */}
    </div>
  );
};

export default PasswordRequirement;
