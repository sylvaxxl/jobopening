import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { parseCookies } from "nookies";
import EditExperienceForm from "./editExperienceForm";
import { applyButton } from "../formdefaults";

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
  const [editExperience, setEditExperience] = useState(false);
  const [addExperience, addEditExperience] = useState(false);

  const handleExperienceChange = (index, event) => {
    let data = [...experience];
    data[index][event.target.name] = event.target.value;
    setExperience(data);
  };

  const OpenEditForm = () => {
    setEditExperience(!editExperience);
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(experience);
  }

  
  return (
    <div>
      <div className="text-3xl font-semibold text-center text-[#0F74BB] mb-5">
        Work Experience
      </div>
      {experience.map((data, index) => {
        return (
          <div
            className="flex flex-col border-1 rounded bg-slate-50 shadow-sm border-blue-200 px-3 py-3 space-y-3"
            key={index}
          >
            <div className="md:flex justify-between">
              <div>
                <h2 className="font-semibold text-[#0F74BB] text-xl">
                  {data.title}
                </h2>
                <p className="font-semibold text-gray-400">
                  {`at ${data.company}`}
                </p>
                <p className="font-medium text-sm">{data.job_type}</p>
              </div>
              <p className="font-medium text-sm">
                {`${data.start_month}, ${data.start_year} - ${
                  data.present == true ? "Present" : `${end_month}, ${end_year}`
                }`}
              </p>
            </div>
            <p className="text-gray-700">{data.job_role}</p>
            <div className="flex justify-end space-x-3 cursor-pointer">
                {/* Edit */}
              <p
                onClick={OpenEditForm}
                className="text-green-500 hover:text-green-900"
              >
                Edit
              </p>
              {/* Delete */}
              <p className="text-red-500 hover:text-red-900">Delete</p>
            </div>
            {/* Experience PopUp */}
            {editExperience && (
              <EditExperienceForm
                data={data}
                OpenEditForm={OpenEditForm}
                handleExperienceChange={handleExperienceChange}
                index={index}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        );
      })}
      {/* Add Experience */}
       <div className="flex justify-center my-3">
        <button className={applyButton} onClick={OpenEditForm}>
          Add
        </button>
      </div>
    </div>
  );
};
export default WorkExperience;
