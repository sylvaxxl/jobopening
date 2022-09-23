import { useState } from "react";
import nookies from "nookies";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";

const employerSignup = () => {
  const [signupData, setSignupData] = useState({ credit: 0, usertype: "employer" });
  const inputClass =
    "appearance-none block md:w-[350px] w-full bg-gray-100 text-gray-700 rounded-3xl py-3 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]";
  const errIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ff1a1a"
      className="w-4 h-4 mx-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
  const errmessage = "flex text-[#ff1a1a] -mt-2 mb-2 text-xs";

  const [errFirstname, setErrFirstname] = useState(false);
  const [errLastname, setErrLastname] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [errCompany, setErrCompany] = useState(false);
  const [errUsername, setErrUsername] = useState(false);
  const [errRepassword, setErrRepassword] = useState(false);
  const [errPhone, setErrPhone] = useState(false);

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameCheck = new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'s][a-zA-Z]+)*$");
    const passwordCheck = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    const usernameCheck = new RegExp(
      "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
    );
    const phoneCheck = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    );

    if (!nameCheck.test(signupData.firstname)) {
      return setErrFirstname(true);
    } else {
      setErrFirstname(false);
    }

    if (!nameCheck.test(signupData.lastname)) {
      return setErrLastname(true);
    } else {
      setErrLastname(false);
    }

    if (!usernameCheck.test(signupData.username)) {
      return setErrUsername(true);
    } else {
      setErrUsername(false);
    }

    if (!passwordCheck.test(signupData.password)) {
      return setErrPassword(true);
    } else {
      setErrPassword(false);
    }

    if (!phoneCheck.test(signupData.phone)) {
      return setErrPhone(true);
    } else {
      setErrPhone(false);
    }

    if (signupData.password !== signupData.repassword) {
      return setErrRepassword(true);
    } else {
      setErrRepassword(false);
    }

    //console.log(signupData);
    const reqSignUp = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );
    const resSignUp = await reqSignUp.json();
    //console.log(resSignUp)

    const userLogo = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/avatars`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resSignUp.jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { userid: `${resSignUp.user.id}` } }),
    });
    const resLogo = await userLogo.json();
    //console.log(resLogo)

    nookies.set(null, "jwt", resSignUp.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    Router.push("/dashboard/employer");
  };

  return (
    <div className="bg-blue-900 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-center text-3xl text-slate-50 font-semibold py-4 my-4">
        Create an Employer Account
      </h1>
      <form onSubmit={handleSubmit} className="px-4 md:px-0">
        <div className="md:flex md:space-x-3 md:my-3">
          <div>
            <input
              className={inputClass}
              name="firstname"
              type="text"
              placeholder="First Name"
              required
              onChange={handleChange}
            />
            {errFirstname && (
              <p className={errmessage}>{errIcon} Invalid First Name</p>
            )}
          </div>
          <div>
            <input
              className={inputClass}
              name="lastname"
              type="text"
              placeholder="Last Name"
              required
              onChange={handleChange}
            />
            {errLastname && (
              <p className={errmessage}>{errIcon} Invalid Last Name</p>
            )}
          </div>
        </div>
        <div className="md:flex md:space-x-3 md:my-3">
          <div>
            <input
              className={inputClass}
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className={inputClass}
              name="username"
              type="text"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            {errUsername && (
              <p className={errmessage}>{errIcon} Invalid Username</p>
            )}
          </div>
        </div>
        <div className="md:flex md:space-x-3 md:my-3">
          <div>
            <input
              className={inputClass}
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            {errPassword && (
              <p className={errmessage}>
                {errIcon} Min 8 characters, at least 1 uppercase, <br />1
                lowercase, 1 number and 1 special character
              </p>
            )}
          </div>
          <div>
            <input
              className={inputClass}
              name="repassword"
              type="password"
              placeholder="Re-password"
              required
              onChange={handleChange}
            />
            {errRepassword && (
              <p className={errmessage}>{errIcon} passwords don't match</p>
            )}
          </div>
        </div>
        <div className="md:flex md:space-x-3 md:my-3">
          <div>
            <input
              className={inputClass}
              name="phone"
              type="text"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
            {errPhone && (
              <p className={errmessage}>{errIcon} Invalid Phone number</p>
            )}
          </div>
          <div>
            <input
              className={inputClass}
              name="company"
              type="text"
              placeholder="Company Name"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="">
          <div className="mb-3 xl:w-96">
            <select
              onChange={handleChange}
              name="position"
              required
              className={`transition ease-in-out ${inputClass}`}
            >
              <option value="">Position in company</option>
              <option value="C-level: CEO / COO / CIO / CFO / CTO / CPO">
                C-level: CEO / COO / CIO / CFO / CTO / CPO
              </option>
              <option value="Senior Management: Head of Department / Team Lead">
                Senior Management: Head of Department / Team Lead
              </option>
              <option value="Middle Management: Supervisor / Unit Head">
                Middle Management: Supervisor / Unit Head
              </option>
              <option value="Junior Level: Associate / Officer">
                Junior Level: Associate / Officer
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-center my-10">
          <button className="flex self-center bg-[#0F74BB] px-14 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
export default employerSignup;

export const getServerSideProps = async (ctx) => {
  const jwt = parseCookies(ctx).jwt;
  console.log(ctx.req.cookies);
  let rest;
  try {
    const req = await fetch(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    rest = await req.json();
  } catch (e) {
    rest = [];
  }
  //console.log(rest)
  if (rest.length === 0) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

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
