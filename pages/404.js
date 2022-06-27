import React from 'react'
import Link from 'next/link'
const Error = () => {
  return (
    <div className="error-page-container flex flex-col justify-center items-center h-full">

        <h1 className='text-red-600 font-bold text-3xl m-10'>ERROR</h1>
        <p className='text-xl font-semibold m-6 text-center md:text-2xl'>Sorry, the page you are looking for does not exist.</p>

        <Link href="/">
            <div className="text-xl m-10 text-blue-800 font-semibold cursor-pointer md:text-2xl ">
             Go back home
                </div> 
              </Link>
    </div>
  )
}

export default Error