import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Jobcard = (data) => {
  //console.log(data);  
  const featured = data.attributes.featured ? "border-green-500": "border-white"

  const router = useRouter();
  return (
    <div className={`rounded-3xl shadow px-4 py-3 bg-white border-2 ${featured}`}>
      {/**Industry */}
      <div className="bg-sky-100 text-sm text-sky-600 w-max py-2 px-4 rounded-3xl my-4">
        {data.attributes.industry.data.attributes.industry}
      </div>
      {/**Title */}
      <div
        className="text-2xl font-semibold cursor-pointer"
        onClick={() => router.push(`/jobs/${data.attributes.slug}`)}
      >
        {data.attributes.title}
      </div>
      <div className="flex align-middle my-3 text-gray-500 justify-between">
        <div className="flex space-x-1 bg-gray-200 px-3 rounded-3xl">
          {<Image src="/images/location.svg" alt="" height={15} width={15} />}
          <p> {data.attributes.location.data.attributes.States}</p>
        </div>
        <div className="bg-gray-200 px-3 rounded-3xl">{data.attributes.job_type.data.attributes.type}</div>
      </div>
      {/**Salary */}
      <div>Salary {data.attributes.salary}</div>
      <div className="flex my-2 pt-2 justify-between">
        <div className="flex mr-5 space-x-2 items-center">
          <div>
            {/**Company Logo */}
            <Image
              className="rounded-full shadow-md"
              src={process.env.NEXT_PUBLIC_URL + data.attributes.logo.data.attributes.url}
              alt="logo"
              height={40}
              width={40}
            />
          </div>
          {/**Company Name */}
          <p className="font-semibold">{data.attributes.CompanyName}</p>
        </div>
        <p className="text-gray-500 flex items-center">5hr ago</p>
      </div>
    </div>
  );
};
export default Jobcard;
