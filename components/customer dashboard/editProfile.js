import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { parseCookies } from "nookies";
import date from "date-and-time";
import Image from "next/image";
import { days, months, years, inputClass, applyButton, errIcon, errmessage } from "../formdefaults";

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
  const [profileData, setProfileData] = useState(null);
  const [inputFields, setInputFields] = useState(
    customerDetails.data[0].attributes.skills
  );
  const [file, setFile] = useState(null)
  const [errFile, setErrFile] = useState(false)

  const jwt = parseCookies(ctx).jwt;

  const smallButton =
    "rounded-full px-2 py-1 mb-3 bg-[#0F74BB] text-xs text-slate-50 font-semibold";
  const dividerLine = "w-full h-px bg-slate-200 flex self-center my-5";

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

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(inputFields, profileData)
    if(file !== null){
      if(file.type === "image/png" || file.type === "image/jpeg"){
        const reqNull = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/customers/${customerDetails.data[0].id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${jwt}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { avatar: null } }),
          }
        );
        const resNull = await reqNull.json();
        console.log(resNull);
  
      console.log(file[0]);
      let formData = new FormData();
      
      formData.append("files", file[0]);      
          formData.append('ref', 'api::customer.customer')
          formData.append('refId', customerDetails.data[0].id) //'refId' The event Id
          formData.append('field', 'avatar') //'field' the image field we called 'image'
          //formData.append('source', 'users-permissions');
  
      const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },     
        body: formData,
      });
      const res = await req.json();
      console.log(res);
      } else{
        return setErrFile(true)
      }
     
    }
    setErrFile(false)
    
    // const reqUpdateDetails = await fetch(
    //   `${process.env.NEXT_PUBLIC_URL}/api/customers/${customerDetails.data[0].id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${jwt}`,
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ data: {...profileData, skills: [...inputFields] } }),
    //   }
    // );
    // const resUpdateDetails = await reqUpdateDetails.json();
    // console.log(resUpdateDetails);
  };

  //console.log(customerDetails);
  return (
    <div>
      <div className="text-3xl font-semibold text-center text-[#0F74BB] mb-5">
        Edit Profile
      </div>
      <div className="h-full w-full bg-slate-50 rounded md:p-5 p-3">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar */}
          <div className="flex flex-col md:flex-row items-center space-x-5 justify-center">
            <Image
              className="rounded-full shadow-sm"
              src={
                customerDetails.data[0].attributes.avatar.data == null
                  ? "/images/avatar2.jpg"
                  : process.env.NEXT_PUBLIC_URL +
                    customerDetails.data[0].attributes.avatar.data.attributes
                      .url
              }
              height={80}
              width={80}
              alt="Avatar"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e)=>setFile(e.target.files)}
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
          {errFile && <p className={`${errmessage} text-lg justify-center`}>{errIcon} Invalid File</p>}
          {/* Title */}
          <input
            className={inputClass}
            name="title"
            type="text"
            placeholder="Title"
            defaultValue={customerDetails.data[0].attributes.title}
            required
            onChange={handleChange}
          />
          {/* Names */}
          <div className="md:flex md:space-x-3 md:my-3">
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                value={userDetails.firstname}
                required
                disabled
                //onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                value={userDetails.lastname}
                disabled
                required
                //onChange={handleChange}
              />
            </div>
          </div>
          {/* Email */}
          <input
            className={inputClass}
            name="email"
            type="email"
            defaultValue={userDetails.email}
            disabled
            required
            //onChange={handleChange}
          />
          {/* Phone */}
          <input
            className={inputClass}
            name="phone"
            type="text"
            placeholder="Your Phone Number"
            defaultValue={userDetails.phone}
            required
            onChange={handleChange}
          />
          <div className={dividerLine}></div>
          {/* Date of birth */}
          <h2 className="font-medium">Date Of Birth</h2>
          <div className="md:flex md:space-x-3 md:my-3">
            <div className="w-full">
              <select
                onChange={handleChange}
                name="day"
                required
                defaultValue={customerDetails.data[0].attributes.dob.day}
                className={`transition ease-in-out ${inputClass}`}
              >
                {days.map((day) => (
                  <option key={day} value={` ${day}`}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <select
                onChange={handleChange}
                name="month"
                required
                defaultValue={customerDetails.data[0].attributes.dob.month}
                className={`transition ease-in-out ${inputClass}`}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <select
                onChange={handleChange}
                name="year"
                required
                defaultValue={customerDetails.data[0].attributes.dob.year}
                className={`transition ease-in-out ${inputClass}`}
              >
                {years.map((year) => (
                  <option key={year} value={` ${year}`}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={dividerLine}></div>
          {/* Skills */}
          <h2 className="font-medium">Skills</h2>
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
                <div className="m-auto flex space-x-1">
                  {inputFields.length > 1 ? (
                    <button
                      className={smallButton}
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
          <div className="flex justify-center">
            <button className={applyButton} onClick={addFields}>
              Add Skill
            </button>
          </div>
          <div className={dividerLine}></div>
          {/* About Yourself */}
          <textarea
            className={`${inputClass} h-52`}
            name="about"
            type="textarea"
            placeholder="About Yourself"
            defaultValue={customerDetails.data[0].attributes.about}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button className={applyButton} onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
