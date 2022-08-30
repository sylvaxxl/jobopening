import { setCookie, parseCookies } from "nookies";
import Router, { useRouter } from "next/router";

const SignUp = () => {
  const card =
    "rounded-3xl shadow-md px-2 py-6 bg-white border-2 text-center flex flex-col justify-center items-center w-80 lg:w-96 m-3";
  return (
    <div className="lg:w-[1190px] flex flex-col justify-center items-center w-auto">
      <h1 className="text-3xl text-center font-semibold py-4 text-[#0F74BB]">
        Create Your Account
      </h1>
      <div className="lg:flex">
        <div className={card}>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0F74BB"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <h2 className="text-3xl py-2 font-medium">Job Seeker</h2>
          <p>Are you looking for your dream job?</p>
          <p>Create a unique career profile with Jobberman</p>
          <button onClick={() => Router.push("/signup/customer")} className="px-6 py-2 bg-[#0F74BB] rounded-3xl text-slate-50 my-3 hover:bg-slate-600">
            Sign Up
          </button>
        </div>
        <div className={card}>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0F74BB"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h2 className="text-3xl py-2 font-medium">Employer</h2>
          <p>Are you looking for quality candidates?</p>
          <p>Advertise and search with Jobberman</p>
          <button onClick={()=>Router.push('/signup/employer')} className="px-6 py-2 bg-[#0F74BB] rounded-3xl text-slate-50 my-3 hover:bg-slate-600">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

export const getServerSideProps = async (ctx) => {
  const jwt = parseCookies(ctx).jwt;
  console.log(ctx.req.cookies);

  const req = await fetch(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const rest = await req.json();
  //console.log(rest)

  if (rest.confirmed) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
