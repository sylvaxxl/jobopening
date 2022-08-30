import Jobdata from "./jobdata";
import { useEffect, useState } from "react";
import Jobcard from "./jobcard";

const Joblist = (datas) => {
  const [jobs, setJobs] = useState(Jobdata);

  return (
    <div className="px-5 grid lg:grid-cols-3 md:grid-cols-2 gap-5 ">
      {jobs.map((job) => {
        return <div key={datas.id}>{datas.id}</div>; //<Jobcard key={datas.id} {...datas} />;
      })}
    </div>
  );
};
export default Joblist;
