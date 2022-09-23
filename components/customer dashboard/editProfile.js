import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { parseCookies } from "nookies";
import date from "date-and-time";
import Image from "next/image";

const EditProfile = (ctx) => {
  const [
    userDetails,
    setUserDetails,
    mypostedJobs,
    setMyPostedJobs,
    logo,
    setLogo,
    customerDetails,
    setCustomerDetails,
  ] = useContext(UserContext);
  const [profileData, setProfileData] = useState();
  const [inputFields, setInputFields] = useState(
    customerDetails.data[0].attributes.skills
  );
  const jwt = parseCookies(ctx).jwt;
  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 rounded-3xl py-3 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]";
  const applyButton =
    "flex self-center bg-[#0F74BB] px-8 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]";

  const now = new Date(customerDetails.data[0].attributes.dob);
  const period = date.format(now, "DD MMM YYYY");

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = (e) => {
    e.preventDefault();
    let newfield = { yourskill: "" };

    setInputFields([...inputFields, newfield]);
  };

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputFields);

    // const reqUpdateDetails = await fetch(
    //   `${process.env.NEXT_PUBLIC_URL}/api/customers/${customerDetails.data[0].id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${jwt}`,
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ data: { skills: [...inputFields] } }),
    //   }
    // );
    // const resUpdateDetails = await reqUpdateDetails.json();
    // console.log(resUpdateDetails);
  };
  console.log(customerDetails);
  return (
    <div>
      <div className="text-3xl font-semibold text-center text-[#0F74BB] mb-5">
        Edit Profile
      </div>
      <div className="h-full w-full bg-slate-50 rounded md:p-5 p-3">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row items-center space-x-5 justify-center">
            <Image
              className="rounded-full shadow-sm"
              src={customerDetails.data[0].attributes.avatar.data == null ? "/images/avatar2.jpg" : process.env.NEXT_PUBLIC_URL+customerDetails.data[0].attributes.avatar.data.attributes.url}
              height={80}
              width={80}
              alt = "Avatar"
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
            name="email"
            type="email"
            defaultValue={userDetails.email}
            disabled
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
          
        {inputFields.map((input, index) => {
          return (
            <div className="flex gap-x-2" key={index}>
              <input
                className={inputClass}
                name="yourskill"
                placeholder="Skill"
                defaultValue={inputFields[index].yourskill}
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              <div className="m-auto">
                {inputFields.length > 1 ? (
                  <button
                    className="rounded-full px-2 py-1 mb-3 bg-[#0F74BB] text-xs text-slate-50 font-semibold"
                    onClick={() => removeFields(index)}
                  >
                    X
                  </button>
                ) : (
                  <div className="py-1 px-2"></div>
                )}
              </div>
            </div>
          );
        })}
        <button onClick={addFields}>Add More</button>
        <button onClick={handleSubmit}>Update</button>
      </form>
      {period}
      </div>
    </div>
  );
};
export default EditProfile;
