import { useEffect, useState } from "react"

const employerSignup = ()=>{
    const [signupData, setSignupData] = useState(null)
    const inputClass = "appearance-none block md:w-[350px] w-full bg-gray-100 text-gray-700 rounded-3xl py-3 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]"

    const handleChange = (e)=>{ 
        setSignupData({...signupData, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
         console.log(signupData)
         const reqSignUp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
          })
          const resSignUp = await reqSignUp.json()
          console.log(resSignUp)
        }

    return(
        <div className="bg-blue-900 flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-center text-3xl text-slate-50 font-semibold py-4 my-4">Create an Employer Account</h1>
            <form onSubmit={handleSubmit} className="px-4 md:px-0">
                <div className="md:flex md:space-x-3 md:my-3">                
            <input
            className={inputClass}
            name="firstname"
            type="text"
            placeholder="First Name"
            required
            onChange={handleChange}
          />
            <input
            className={inputClass}
            name="lastname"
            type="text"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />
          </div>
                <div className="md:flex md:space-x-3 md:my-3">                
            <input
            className={inputClass}
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
            <input
            className={inputClass}
            name="username"
            type="text"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          </div>
                <div className="md:flex md:space-x-3 md:my-3">                
            <input
            className={inputClass}
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
            <input
            className={inputClass}
            name="repassword"
            type="password"
            placeholder="Re-password"
            required
            onChange={handleChange}
          />
          </div>
                <div className="md:flex md:space-x-3 md:my-3">                
            <input
            className={inputClass}
            name="phone"
            type="number"
            placeholder="Phone Number"
            required
            onChange={handleChange}
          />
            <input
            className={inputClass}
            name="company"
            type="text"
            placeholder="Company Name"
            required
            onChange={handleChange}
          />
          </div>
          <div className="">
  <div className="mb-3 xl:w-96">
    <select onChange={handleChange} name="position" className={`transition ease-in-out ${inputClass}`}>
        <option value="">Position in company</option>
        <option value="C-level: CEO / COO / CIO / CFO / CTO / CPO">C-level: CEO / COO / CIO / CFO / CTO / CPO</option>
        <option value="Senior Management: Head of Department / Team Lead">Senior Management: Head of Department / Team Lead</option>
        <option value="Middle Management: Supervisor / Unit Head">Middle Management: Supervisor / Unit Head</option>
        <option value="Junior Level: Associate / Officer">Junior Level: Associate / Officer</option>
    </select>
  </div>
</div>
<div className="flex justify-center my-10">
    <button className="flex self-center bg-[#0F74BB] px-14 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]">Sign Up</button>
</div>
            </form>
        </div>
    )
}
export default employerSignup