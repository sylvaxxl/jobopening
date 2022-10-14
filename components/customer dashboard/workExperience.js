import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { parseCookies } from "nookies";
import EditExperienceForm from "./editExperienceForm";
import { applyButton } from "../formdefaults";
import AddExperienceForm from "./addExperienceForm";

const WorkExperience = (ctx) => {
  const jwt = parseCookies(ctx).jwt;
  const [
    userDetails,
    setUserDetails,
    mypostedJobs,
    setMyPostedJobs,
    logo,
    setLogo,
    customerDetails,
    setCustomerDetails,
  ] = useContext(UserContext);
  const [experience, setExperience] = useState(
    customerDetails.data[0].attributes.experience
  );

  const [addExperience, setAddExperience] = useState(false);

  const AddForm = () => {
    setAddExperience(!addExperience);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-semibold text-center text-[#0F74BB] mb-5">
        Work Experience
      </div>
      <div className="grid gap-6 max-w-xl">
      {experience.map((data, index) => {
        return <EditExperienceForm key={index} {...data} />;
      })}
      </div>
      
      {/* Add Experience PopUp */}
      {addExperience && <AddExperienceForm AddForm={AddForm} />}
      {/* Add Experience Button */}
      <div className="flex justify-center my-3">
        <button className={applyButton} onClick={AddForm}>
          Add
        </button>
      </div>
    </div>
  );
};
export default WorkExperience;
