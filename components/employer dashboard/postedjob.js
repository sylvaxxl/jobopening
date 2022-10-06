import { useContext } from "react"
import PostedJobsCard from "./postedJobsCard"
import { UserContext } from "../userContext"


const PostedJobs = ()=>{
    const [userDetails, setUserDetails, myPostedJobs, setMyPostedJobs] = useContext(UserContext);
    //console.log(myPostedJobs)
    return(
        <div>
            <div className="text-3xl font-semibold text-center text-[#0F74BB] mb-5">Posted Jobs</div>
            <div className="flex flex-col lg:flex-row md:p-0 p-3 lg:space-x-5 lg:space-y-0 space-y-4 items-center">
               {myPostedJobs.map(job=>(<PostedJobsCard key={job.id} {...job}/>))}
            </div>
        </div>
    )
}
export default PostedJobs