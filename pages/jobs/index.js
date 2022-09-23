import Jobdata from "../../components/homepagelist/jobdata";
import { useState } from "react";
import Link from "next/link";
import Jobcard from "../../components/homepagelist/jobcard";

const Job = ({data}) => {
 
  return (
    <div className="bg-gray-100 pb-5 flex justify-center">
          <div className=" w-[1190px] flex flex-col justify-center">
            <h1 className="text-3xl text-center font-semibold py-5">
              Discover jobs for you
            </h1>
            <div className="px-5 grid lg:grid-cols-3 md:grid-cols-2 gap-5">
              {data.map((data) => (
                <Jobcard key={data.id} {...data} />
              ))}
            </div>
          </div>
        </div>
  );
};
export default Job;

export const getServerSideProps = async () => {
  let data;
  try{const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/jobs?populate=*");  
  data = await res.json();
}catch(e){
  data =[]
}
  if (data.length === 0) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
  
  return {
    props: { data : data.data },
  };
};