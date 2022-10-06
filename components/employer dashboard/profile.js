import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import Image from "next/image";
import { parseCookies } from "nookies";

const Profile = (ctx) => {
  const [
    userDetails,
    setUserDetails,
    mypostedJobs,
    setMyPostedJobs,
    logo,
    setLogo,
  ] = useContext(UserContext);
  const [newData, setNewData] = useState(null);
  const jwt = parseCookies(ctx).jwt;
  const applyButton =
    "flex self-center bg-[#0F74BB] px-8 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]";
  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 rounded-3xl py-3 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]";
  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newData);
    if(newData === null){return}
    const resUserUpdate = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/${userDetails.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    const reqUserUpdate = await resUserUpdate.json();
    console.log(reqUserUpdate);
  };
  //console.log(userDetails);
  return (
    <div>
      <div className="text-3xl font-semibold text-center text-[#0F74BB] mb-5">
        My Profile
      </div>
      <div className="h-full w-full bg-slate-50 rounded md:p-5 p-3">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col md:flex-row items-center space-x-5 justify-center">
            <Image
              className="rounded-full shadow-sm"
              src={logo}
              height={80}
              width={80}
            />
            <input
              type="file"
              onChange={handleChange}
              name="logo"
              className="text-sm text-grey-500
            file:mr-3 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-[#0F74BB] file:text-slate-50
            hover:file:cursor-pointer hover:file:bg-blue-200
            hover:file:text-[#0F74BB]
          "
            />
          </div>
          <input
            className={inputClass}
            type="text"
            value={userDetails.company}
            disabled
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="email"
            type="email"
            defaultValue={userDetails.email}
            disabled
            required
            onChange={handleChange}
          />
          <div className="md:flex md:space-x-3 md:my-3">
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                value={userDetails.firstname}
                required
                disabled
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                value={userDetails.lastname}
                disabled
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <input
            className={inputClass}
            name="address"
            type="text"
            placeholder="Company's Address"
            defaultValue={userDetails.address}
            required
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="phone"
            type="text"
            placeholder="Company's Phone Number"
            defaultValue={userDetails.phone}
            required
            onChange={handleChange}
          />
          <select
            onChange={handleChange}
            name="position"
            required
            defaultValue={userDetails.position}
            className={`transition ease-in-out ${inputClass}`}
          >
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
          <div className="flex justify-center">
            <button className={applyButton}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
