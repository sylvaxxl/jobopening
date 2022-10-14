import { useState } from "react";
import { inputClass, months, jobYears, applyButton } from "../formdefaults";

const EditExperienceForm = (data) => {
  const [check, setCheck] = useState(data.present);
  const [editExperience, setEditExperience] = useState(false);
  const [updateExperience, SetUpdateExperience] = useState(null);

  const handleChange = (e) => {
    SetUpdateExperience({
      ...updateExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateExperience);
  };

  //console.log(data);
  const dateLabel = "text-slate-50 font-medium ml-3";
  return (
    <div>
      <div className="flex flex-col border-1 rounded bg-slate-50 shadow-sm border-blue-200 px-3 py-3 space-y-3">
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
              data.present === true
                ? "Present"
                : `${data.end_month}, ${data.end_year}`
            }`}
          </p>
        </div>
        <p className="text-gray-700">{data.job_role}</p>
        <div className="flex justify-end space-x-3 cursor-pointer">
          {/* Edit */}
          <p
            //onClick={OpenEditForm}
            onClick={() => setEditExperience(!editExperience)}
            className="text-green-500 hover:text-green-900"
          >
            Edit
          </p>
          {/* Delete */}
          <p className="text-red-500 hover:text-red-900">Delete</p>
        </div>
      </div>
      {editExperience && (
        <div className="absolute -top-3 left-0 bg-blue-500 min-h-screen w-full p-5 flex flex-col">
          <div className="flex flex-col w-11/12 lg:w-1/2 self-center">
          <div className="flex justify-end pb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="w-6 h-6"
              onClick={() => setEditExperience(!editExperience)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <input
            className={inputClass}
            name="title"
            type="text"
            defaultValue={data.title}
            required
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="company"
            type="text"
            defaultValue={data.company}
            required
            onChange={handleChange}
          />
          <div className="md:flex md:space-x-3 md:my-3">
            <div className="w-full">
              <p className={dateLabel}>Start Month</p>
              <select
                onChange={handleChange}
                name="start_month"
                required
                defaultValue={data.start_month}
                className={`transition ease-in-out ${inputClass}`}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <p className={dateLabel}>Start Year</p>
              <select
                onChange={handleChange}
                name="start_year"
                required
                defaultValue={data.start_year}
                className={`transition ease-in-out ${inputClass}`}
              >
                <option value="">Year</option>
                {jobYears.map((year) => (
                  <option key={year} value={` ${year}`}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!check && (
            <div className="md:flex md:space-x-3 md:my-3">
              <div className="w-full">
                <p className={dateLabel}>End Month</p>
                <select
                  onChange={handleChange}
                  name="end_month"
                  required
                  defaultValue={data.end_month}
                  className={`transition ease-in-out ${inputClass}`}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <p className={dateLabel}>End Year</p>
                <select
                  onChange={handleChange}
                  name="end_year"
                  required
                  defaultValue={data.end_year}
                  className={`transition ease-in-out ${inputClass}`}
                >
                  <option value="">Year</option>
                  {jobYears.map((year) => (
                    <option key={year} value={` ${year}`}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-1 pl-3 mb-3">
            <input
              className="h-5 w-5"
              //defaultValue={data.present}
              type="checkbox"
              defaultChecked={data.present}
              onChange={(event) => (setCheck(!check), handleChange)}
            />
            <p className={dateLabel}>Present</p>
          </div>
          <select
            onChange={handleChange}
            name="job_type"
            required
            defaultValue={data.job_type}
            className={`transition ease-in-out ${inputClass}`}
          >
            <option value="">Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
          </select>
          <textarea
            className={`${inputClass} h-52`}
            name="description"
            type="textarea"
            placeholder="Job Summary"
            required
            defaultValue={data.job_role}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button className={applyButton} onClick={handleSubmit}>
              Save
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditExperienceForm;
