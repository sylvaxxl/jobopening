import { useState } from "react";
import { inputClass, months, jobYears, applyButton } from "../formdefaults";

const EditExperienceForm = ({data, OpenEditForm, handleExperienceChange, index, handleSubmit}) => {  
  const [check, setCheck] = useState(false);
  const dateLabel = "text-slate-50 font-medium ml-3";
  return (
    <div className="absolute -top-3 left-0 bg-blue-500 h-screen w-full p-5">
      <div className="flex justify-end pb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="white"
          className="w-6 h-6"
          onClick={OpenEditForm}
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
        onChange={(event) => handleExperienceChange(index, event)}
      />
      <input
        className={inputClass}
        name="company"
        type="text"
        defaultValue={data.company}
        required
        onChange={(event) => handleExperienceChange(index, event)}
      />
      <div className="md:flex md:space-x-3 md:my-3">
        <div className="w-full">
          <p className={dateLabel}>Start Month</p>
          <select
            onChange={(event) => handleExperienceChange(index, event)}
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
            onChange={(event) => handleExperienceChange(index, event)}
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
      {check && (
        <div className="md:flex md:space-x-3 md:my-3">
          <div className="w-full">
            <p className={dateLabel}>End Month</p>
            <select
              onChange={(event) => handleExperienceChange(index, event)}
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
              onChange={(event) => handleExperienceChange(index, event)}
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
          defaultValue={data.present}
          type="checkbox"
          defaultChecked={data.present}
          onChange={(event) => (
            setCheck(!check), handleExperienceChange(index, event)
          )}
        />
        <p className={dateLabel}>Present</p>
      </div>
      <select
        onChange={(event) => handleExperienceChange(index, event)}
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
        onChange={(event) => handleExperienceChange(index, event)}
      />
      <div className="flex justify-center">
        <button className={applyButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};
export default EditExperienceForm;
