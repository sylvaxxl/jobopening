import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { parseCookies, destroyCookie } from "nookies";
import nookies from 'nookies'
import Overview from "../../../components/employer dashboard/overview";
import Postjob from "../../../components/employer dashboard/postjob";
import Postedjob from "../../../components/employer dashboard/postedjob";
import { UserContext } from "../../../components/userContext";
import Loading from "../../../components/loading";
import Profile from "../../../components/employer dashboard/profile";
import Router from "next/router";

const EmployerDashboard = (ctx) => {
  const jwt = parseCookies(ctx).jwt;
  const [
    userDetails,
    setUserDetails,
    mypostedJobs,
    setMyPostedJobs,
    logo,
    setLogo,
  ] = useContext(UserContext);

  const [rendered, setRendered] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const listIcon = "w-6 h-6 mr-[2px]";

  const data = async () => {
    setRendered(<Loading />);
    setLoading(true);
    let res;
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (req.ok) {
        res = await req.json();
        setUserDetails(res);
      } else {
        throw "Error getting data";
      }
    } catch (e) {
      console.log(e);
    }

    const jobsreq = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/jobs?filters[userid][$eq]=${res.id}&populate=*`
    );
    const jobsres = await jobsreq.json();
    setMyPostedJobs(jobsres.data);

    const reqLogo = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/avatars?filters[userid][$eq]=${res.id}&populate=*`
    );
    const resLogo = await reqLogo.json();
    let finalLogo = resLogo.data[0].attributes.image.data;
    if (finalLogo !== null) {
      setLogo(process.env.NEXT_PUBLIC_URL + finalLogo.attributes.url);
    } else {
      setLogo("/images/jobopenings_Icon_02.png");
    }
    //setLogo(finalLogo);
    setRendered(<Overview />);
    setLoading(false);
  };

  useEffect(() => {
    data();
  }, [jwt]);

  const handleClick = ()=>{
    // setUserDetails(null)
    // setMyPostedJobs(null)
    // setLogo(null)
    destroyCookie(null, 'jwt', {
      path: '/', 
    }) 
    Router.push('/')    
  }

  return (
    <div className="flex">
      <div className="w-1/4 bg-[#0F74BB] min-h-screen hidden md:block">
        <div className="flex justify-center m-3">
          <Image className="rounded-full" src={logo} height={80} width={80} alt=""/>
        </div>

        {!loading && (
          <div className="md:pl-5 lg:pl-7 text-slate-50 font-medium space-y-3 text-xl">
            <p className="flex" onClick={() => setRendered(<Overview />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={listIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Overview
            </p>
            <p className="flex" onClick={() => setRendered(<Profile />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={listIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Profile
            </p>
            <p className="flex" onClick={() => setRendered(<Postedjob />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={listIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
              Posted Jobs
            </p>
            <p
              className="flex"
              onClick={() => setRendered(<Postjob {...logo} />)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={listIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Post A Job
            </p>
            <p
              className="flex"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={listIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </p>
          </div>
        )}
      </div>
      <div className="md:w-9/12 min-h-screen w-full bg-slate-200 p-4 relative">
        <div className="absolute top-2 left-2 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-7 h-7 shadow-sm"
            onClick={() => setSideBar(!sideBar)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
        {/* Mobile Side Bar */}
        {sideBar && (
          <div className="h-screen w-screen bg-[#0F74BB] md:hidden absolute top-0 left-0 px-7 py-5 z-10">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-7 h-7"
                onClick={() => setSideBar(!sideBar)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="flex justify-center m-3">
              <Image
                className="rounded-full"
                src={logo}
                height={80}
                width={80}
                alt=""
              />
            </div>

            <div className="md:pl-5 lg:pl-7 text-slate-50 font-medium space-y-3 text-xl">
              <p
                className="flex"
                onClick={() => setRendered(<Overview />) + setSideBar(!sideBar)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={listIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Overview
              </p>

              <p
                className="flex"
                onClick={() => setRendered(<Profile />) + setSideBar(!sideBar)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={listIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Profile
              </p>
              <p
                className="flex"
                onClick={() =>
                  setRendered(<Postedjob />) + setSideBar(!sideBar)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={listIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
                Posted Jobs
              </p>
              <p
                className="flex"
                onClick={() =>
                  setRendered(<Postjob {...logo} />) + setSideBar(!sideBar)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={listIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Post A Job
              </p>
            </div>
          </div>
        )}
        {rendered}
      </div>
    </div>
  );
};
export default EmployerDashboard;

export const getServerSideProps = async (ctx) => {
  const jwt = parseCookies(ctx).jwt;
  //console.log(ctx. req.cookies)
  let rest;
  try {
    const req = await fetch(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    rest = await req.json();
  } catch (e) {
    console.log(e);
    rest = [];
  }
  //console.log(rest)

  if (!rest.confirmed) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }else if(rest.usertype === 'customer'){
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
