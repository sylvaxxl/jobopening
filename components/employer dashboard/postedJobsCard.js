import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

const PostedJobsCard = (jobs, ctx) => {
  const [edit, setEdit] = useState(false);
  const [jobUpdate, setJobUpdate] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const jwt = parseCookies(ctx).jwt;
  const router = useRouter();
  const buttonClass =
    "px-8 py-1 border-2 text-slate-50 rounded-3xl hover:bg-slate-50";
  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 rounded-3xl py-3 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]";
  const featured = jobs.attributes.featured
    ? "border-green-500"
    : "border-white";
  const applyButton =
    "flex self-center bg-[#0F74BB] px-8 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]";

  const handleChange = (e) => {
    setJobUpdate({ ...jobUpdate, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobUpdate);
    if (jobUpdate === null) {
      return;
    }
    let resUpdateJob;
    let reqUpdateJob
    try{reqUpdateJob = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/jobs/${jobs.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: jobUpdate }),
      }
    );
    if (reqUpdateJob.status === 200) {
        resUpdateJob = await reqUpdateJob.json();        
    } else {
        throw 'Error fetching users list'
    }
    
        }catch(e){console.log(e)}
    //if(reqUpdateJob.ok){console.log("Successful")}
    console.log(resUpdateJob);
  };

  const locations = async () => {
    const reqLocation = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/locations`
    );
    const resLocation = await reqLocation.json();
    setLocationData(resLocation.data);
  };

  const jobType = async () => {
    const reqType = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/job-types`);
    const resType = await reqType.json();
    setJobTypeData(resType.data);
  };

  const industry = async () => {
    const reqIndustry = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/industries`
    );
    const resIndustry = await reqIndustry.json();
    setIndustryData(resIndustry.data);
  };

  useEffect(() => {
    locations();
    jobType();
    industry();
  }, []);

  return (
    <div
      className={`w-80 flex-shrink-0 rounded-3xl shadow-md px-4 py-3 bg-white border-2 ${featured} relative`}
    >
      {/**Industry */}
      <div className="bg-sky-100 text-sm text-sky-600 w-max py-2 px-4 rounded-3xl my-4">
        {jobs.attributes.industry.data.attributes.industry}
      </div>
      {/**Title */}
      <div
        className="text-2xl font-semibold cursor-pointer"
        onClick={() => router.push(`/jobs/${jobs.attributes.slug}`)}
      >
        {jobs.attributes.title}
      </div>
      <div className="flex align-middle my-3 text-gray-500 justify-between">
        <div className="flex space-x-1 bg-gray-200 px-3 rounded-3xl">
          <Image src="/images/location.svg" alt="" height={15} width={15} />
          <p> {jobs.attributes.location.data.attributes.States}</p>
        </div>
        <div className="bg-gray-200 px-3 rounded-3xl">
          {jobs.attributes.job_type.data.attributes.type}
        </div>
      </div>
      {/**Salary */}
      <div>Salary {jobs.attributes.salary}</div>
      <div className="flex my-2 pt-2 justify-between">
        <button
          onClick={() => setEdit(!edit)}
          className={`${buttonClass} bg-green-500 border-green-500 hover:text-green-500`}
        >
          Edit
        </button>
        <button
          className={`${buttonClass} bg-red-500 border-red-500 hover:text-red-500`}
        >
          Delete
        </button>
      </div>
      {edit && (
        <div className="w-screen max-h-full bg-blue-500 fixed overflow-y-auto z-10 left-0 top-0 flex flex-col items-center">
          <div className="flex justify-end w-screen p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="w-7 h-7"
              onClick={() => setEdit(!edit)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-10 md:w-2/3 w-full px-4 mb-10"
          >
            <input
              className={inputClass}
              type="text"
              value={jobs.attributes.title}
              disabled
              onChange={handleChange}
            />
            <select
              onChange={handleChange}
              name="industry"
              defaultValue={jobs.attributes.industry.data.id}
              className={`transition ease-in-out ${inputClass}`}
            >
              {industryData.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.attributes.industry}
                </option>
              ))}
            </select>
            <select
              onChange={handleChange}
              name="salary"
              required
              defaultValue={jobs.attributes.salary}
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Salary</option>
              <option value="Confidential">Confidential</option>
              <option value="Below N75k">Below N75k</option>
              <option value="N75k - N100k">N75k - N100k</option>
              <option value="N101k - N150k">N101k - N150k</option>
              <option value="N151k - N250k">N151k - N250k</option>
              <option value="N251k - N350k">N251k - N350k</option>
              <option value="N351k - N450k">N351k - N450k</option>
              <option value="N451k - N550k">N451k - N550k</option>
            </select>
            {/* Location */}
            <select
              onChange={handleChange}
              name="location"
              required
              defaultValue={jobs.attributes.location.data.id}
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Location</option>
              {locationData.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.attributes.States}
                </option>
              ))}
            </select>
            {/* Job Type */}
            <select
              onChange={handleChange}
              name="job_type"
              required
              defaultValue={jobs.attributes.job_type.data.id}
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Type</option>
              {jobTypeData.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.attributes.type}
                </option>
              ))}
            </select>
            {/* Job Summary */}
            <textarea
              className={`${inputClass} h-52`}
              name="description"
              type="textarea"
              placeholder="Job Summary"
              required
              defaultValue={jobs.attributes.description}
              onChange={handleChange}
            />
            {/* Qualification */}
            <select
              onChange={handleChange}
              name="qualification"
              required
              defaultValue={jobs.attributes.qualification}
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Qualification</option>
              <option value="Diploma">Diploma</option>
              <option value="Degree">Degree</option>
              <option value="High School(SSCE)">High School(SSCE)</option>
              <option value="HND">HND</option>
              <option value="MBA/MSc">MBA/MSc</option>
              <option value="MBBS">MBBS</option>
              <option value="MPhil/PhD">MPhil/PhD</option>
              <option value="NCE">NCE</option>
              <option value="OND">OND</option>
            </select>
            {/* Expirience Level*/}
            <select
              onChange={handleChange}
              name="experience"
              required
              defaultValue={jobs.attributes.experience}
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Experience Level</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Graduate Trainee">Graduate Trainee</option>
              <option value="Internship">Internship</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Junior Level">Junior Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Management Level">Management Level</option>
              <option value="Executive Level">Executive Level</option>
              <option value="No Experience">No Experience</option>
            </select>
            {/* Expirience Length */}
            <select
              onChange={handleChange}
              name="level"
              required
              defaultValue={jobs.attributes.level}
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Experience Length</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value=" 1 year">1 year</option>
              <option value=" 2 years">2 years</option>
              <option value=" 3 years">3 years</option>
              <option value=" 4 years">4 years</option>
              <option value=" 5 years">5 years</option>
              <option value=" 6 years">6 years</option>
              <option value=" 7 years">7 years</option>
              <option value=" 8 years">8 years</option>
              <option value=" 9 years">9 years</option>
              <option value="10 years">10 years</option>
            </select>
            {/* Responsibilities */}
            <textarea
              className={`${inputClass} h-52`}
              name="responsibilities"
              type="textarea"
              placeholder="Responsiblities"
              required
              defaultValue={jobs.attributes.responsibilities}
              onChange={handleChange}
            />
            {/* Skills */}
            <textarea
              className={`${inputClass} h-52`}
              name="skills"
              type="textarea"
              placeholder="Skills"
              required
              defaultValue={jobs.attributes.skills}
              onChange={handleChange}
            />
            <div className="flex justify-center">
              <button className={applyButton}>Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default PostedJobsCard;
