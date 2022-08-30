import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {setCookie, parseCookies} from 'nookies'
import nookies from 'nookies'
import Router from "next/router";


const SignIn = () => { 
  const [loginDetails, setLoginDetails] = useState(null)
  const inputClass = "appearance-none block md:w-[300px] w-full bg-gray-100 text-gray-700 rounded-3xl md:py-3 py-2 px-4 mb-3 border-2 border-blue-200 leading-tight focus:outline-none focus:bg-white focus:border-[#0F74BB]"

  const handleChange = (e)=>{
    setLoginDetails({...loginDetails, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()    
    const req  = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/local`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDetails)
    })
    const res = await req.json()
    console.log(res)

    // setCookie(null, 'jwt', res.jwt, {
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: '/dashboard/employer',
    // })

    nookies.set(null, 'jwt', res.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  
    Router.push('/dashboard/employer')
  
  }

  return (
    <div className="bg-signin h-screen bg-no-repeat bg-cover flex justify-center items-center">
      <div className="bg-black w-80 md:w-96 text-slate-50 flex flex-col items-center p-8 rounded-2xl bg-opacity-50">
        <div>
        <Image        
        src='/images/jobopenings_Icon_01.png'
        height={80}
        width = {80}
        alt="JobOpenings"
        />
        </div>
        
        <h1 className="font-semibold text-xl mb-3">
          SignIn To Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          
          <input
            className={inputClass}
            name="identifier"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <div className="flex justify-center flex-col items-center -mt-4 space-y-5">
            <Link className="" href="/">forgot your password?</Link> 
          <button className="flex self-center bg-[#0F74BB] px-8 py-2 border-2 border-[#0F74BB] text-slate-50 rounded-3xl hover:bg-white hover:text-[#0F74BB]">Sign In</button>
          <Link href='/signup'>Don't have an account?</Link>
          </div>
         
        </form>
      </div>
    </div>
  );
};
export default SignIn;

export const getServerSideProps = async(ctx)=>{
  const jwt = parseCookies(ctx).jwt
  console.log(ctx. req.cookies)

  const req  = await fetch(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
    headers: {
      Authorization: `Bearer ${jwt}` 
    }
  })

  const rest = await req.json()
  //console.log(rest)

  if(rest.confirmed){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }
  
  return{
    props:{}
}
}

