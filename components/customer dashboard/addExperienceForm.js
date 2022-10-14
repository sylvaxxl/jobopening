import { useState } from "react";
import { inputClass, months, jobYears, applyButton } from "../formdefaults";

const AddExperienceForm = ({ AddForm }) => {
  const [check, setCheck] = useState(false);
  const [formData, SetFormDate] = useState([]);
  const dateLabel = "text-slate-50 font-medium ml-3";

  const handleChange = (e) => {
    SetFormDate({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="absolute -top-3 left-0 bg-blue-500 h-auto w-full p-5">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-end pb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6"
            onClick={AddForm}
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
          required
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="company"
          type="text"
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
            type="checkbox"
            onChange={() => (setCheck(!check), handleChange)}
          />
          <p className={dateLabel}>Present</p>
        </div>
        <select
          onChange={handleChange}
          name="job_type"
          required
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
          onChange={handleChange}
        />
        <div className="flex justify-center">
          <button className={applyButton} onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddExperienceForm;
