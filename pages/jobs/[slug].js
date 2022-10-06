import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const Singlejob = ({ job }) => {
  const [jobLink, setJobLink] = useState(null);
  const ballonClass = "bg-gray-200 px-3 rounded-3xl mb-2";
  const applyButton =
    " flex self-center bg-[#0F74BB] px-8 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]";
  const smallHeading = "text-xl md:text-3xl font-medium";
  const descriptionList = "md:flex space-x-10 md:items-center mb-2";
  const listHead = "text-xl font-medium flex items-center w-[250px]";

  const router = useRouter();

  //console.log(job);
  const checkLink = () => {
    if (job.length == 0) {
      router.push("/");
      setJobLink("");
    } else {
      setJobLink(
        <div className="flex justify-center py-8">
          <div className="shadow-lg w-3/4 rounded-3xl">
            <div className="bg-[#0F74BB] flex justify-center rounded-t-3xl h-32">
              <div className="absolute mt-20">
                <Image
                  className="bg-white rounded-full shadow"
                  src={job[0].attributes.logo.data === null ? "/images/jobopenings_Icon_01.png" : process.env.NEXT_PUBLIC_URL + job[0].attributes.logo.data.attributes.url}
                  alt={job[0].attributes.CompanyName}
                  height={100}
                  width={100}
                />
              </div>
            </div>

            <div className="md:text-3xl text-2xl font-semibold pt-14 text-center">
              {job[0].attributes.title}
            </div>
            <div className="flex justify-center mt-3 space-x-4 flex-wrap">
              <p className={ballonClass}>
                {job[0].attributes.job_type.data.attributes.type}
              </p>
              <p className={ballonClass}>{job[0].attributes.salary}</p>
              <p className={ballonClass}>
                <Image
                  src="/images/location.svg"
                  alt=""
                  height={15}
                  width={15}
                />
                {job[0].attributes.location.data.attributes.States}
              </p>
            </div>
            <div className="flex justify-center flex-col mt-4">
              <button
                className={applyButton}
                onClick={() => Router.push("/signin")}
              >
                Apply
              </button>
              <div className="w-3/4 bg-slate-300 h-[1px] my-14 flex self-center"></div>
            </div>
            <div className="flex justify-between px-4 md:px-10">
              <h1 className={smallHeading}>Job Description</h1>
              <p>5hrs ago</p>
            </div>
            <div className="p-4">
              <div className="mb-3">{job[0].attributes.description}</div>
              <div className={descriptionList}>
                <h3 className={listHead}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Education:
                </h3>
                <p>{job[0].attributes.qualification}</p>
              </div>
              <div className={descriptionList}>
                <h3 className={listHead}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Experience Level:
                </h3>
                <p>{job[0].attributes.experience}</p>
              </div>
              <div className={descriptionList}>
                <h3 className={listHead}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Experience Length:
                </h3>
                <p>{job[0].attributes.level}</p>
              </div>
              <div className={`${smallHeading} py-4 mt-4`}>
                Responsibilities
              </div>
              <div className="mb-4">{job[0].attributes.responsibilities}</div>
              <div className={`${smallHeading} py-4`}>Requirements</div>
              <div className="mb-4">
                <p>{job[0].attributes.skills}</p>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <button
                className={applyButton}
                onClick={() => Router.push("/signin")}
              >
                apply
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    checkLink();
  }, [job]);

  return <div>{jobLink}</div>;
};
export default Singlejob;

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?filters[slug][$eq]=${slug}&populate=*`
  );
  const res = await req.json();

  return {
    props: { job: res.data },
  };
}
