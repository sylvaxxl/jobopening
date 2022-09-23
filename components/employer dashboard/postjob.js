import { useState, useEffect, useContext } from "react"
import { UserContext } from "../userContext"
import { parseCookies } from "nookies";

const postJob = (ctx)=>{
  const jwt = parseCookies(ctx).jwt;
    let r = (Math.random() + 1).toString(36).substring(7);
    const [userDetails, myPostedJobs] = useContext(UserContext)
    const [newJob, setNewJob] = useState({userid: userDetails.id, CompanyName: userDetails.company})
    const [locationData, setLocationData] = useState([])
    const [industryData, setIndustryData] = useState([])
    const [jobTypeData, setJobTypeData] = useState([])
    const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 rounded-3xl py-3 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]";
    
    const handleChange = (e)=>{
        setNewJob({ ...newJob, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
  const slug = `${newJob.title}`.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
       // console.log({...newJob, slug:`${slug}-${r}`})

        const reqCreateJob = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/jobs`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Accept': 'application/json',        
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({data: {...newJob, slug:`${slug}-${r}`}})
        })
        const resCreateJob = await reqCreateJob.json()
        //console.log(resCreateJob)
    }

    const locations = async ()=>{
        const reqLocation = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/locations`)
        const resLocation = await reqLocation.json()
        setLocationData(resLocation.data)
    }

    const jobType = async ()=>{
        const reqType = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/job-types`)
        const resType = await reqType.json()
        setJobTypeData(resType.data)
    }

    const industry = async ()=>{
        const reqIndustry = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/industries`)
        const resIndustry = await reqIndustry.json()
        setIndustryData(resIndustry.data)        
    }

    useEffect(()=>{
        locations()
        jobType()
        industry()
    },[])   

    
    return(
        <div className="flex flex-col items-center">                   
            <h1 className="text-3xl font-medium py-3 text-[#0F74BB]">Post A Job</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <input
              className={inputClass}
              name="title"
              type="text"
              placeholder="Job Title"
              required
              onChange={handleChange}
            />
             <select
              onChange={handleChange}
              name="industry"
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Industry</option>
              {industryData.map(data =>
                (<option key={data.id} value={data.id}>
                {data.attributes.industry}
              </option>)
              )} 
            </select>

             <select
              onChange={handleChange}
              name="salary"
              required
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

            <select
              onChange={handleChange}
              name="location"
              required
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Location</option>
              {locationData.map(data =>
                (<option key={data.id} value={data.id}>
                {data.attributes.States}
              </option>)
              )} 
            </select>

            <select
              onChange={handleChange}
              name="job_type"
              required
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Type</option>
              {jobTypeData.map(data =>
                (<option key={data.id} value={data.id}>
                {data.attributes.type}
              </option>)
              )} 
            </select>

            <textarea
              className={`${inputClass} h-52`}
              name="description"
              type="textarea"
              placeholder="Job Summary"
              required
              onChange={handleChange}
            />

            <select
              onChange={handleChange}
              name="qualification"
              required
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

            <select
              onChange={handleChange}
              name="experience"
              required
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

            <select
              onChange={handleChange}
              name="level"
              required
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

            <select
              onChange={handleChange}
              name="featured"
              required
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Featured</option>
              <option value="True">True</option>
              <option value="False">False</option>              
            </select>

            <textarea
              className={`${inputClass} h-52`}
              name="responsibilities"
              type="textarea"
              placeholder="Responsiblities"
              required
              onChange={handleChange}
            />

            <textarea
              className={`${inputClass} h-52`}
              name="skills"
              type="textarea"
              placeholder="Skills"
              required
              onChange={handleChange}
            />
            
          <button className="flex self-center bg-[#0F74BB] px-14 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]">
            Create Job
          </button>
        
            </form>   
                   
        </div>
    )
}
export default postJob