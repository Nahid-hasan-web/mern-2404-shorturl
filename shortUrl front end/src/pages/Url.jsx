import axios from "axios";
import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const Url = () => {
    
    
    // ---------------- copy url
    const [copy, setCopy] = useState(false);
    const handelCopy = ()=>{
        setCopy(true)

        setTimeout(() => {
            setCopy(false)
        }, 2000);
        
        var copyText = document.querySelector(".myUrl");
        navigator.clipboard.writeText(copyText.innerHTML);
        
    }

    // ------------------------ short url part 
    const [longUrl , setLongUrl] = useState('')
    const [error , setError]     = useState('')
    const [urlResponse , setUrlRespose] = useState('')

    const handelShort = (e)=>{
      e.preventDefault()
        if(!longUrl) return  setError('Long url required')

        setError('')

        console.log('okk')
        axios.post('http://localhost:8000/url/sendLongUrl' , {longUrl})
        .then((res)=>{setUrlRespose(res.data)})
        .catch((err)=>{console.log(err)})


        // setLongUrl('')
        
    
    }


    console.log(urlResponse)

  return (
    <>
      <div className="bg-[#FBFBFB] h-screen dark:bg-[#000] flex justify-center items-center">
        <div className="w-[500px] border-2 border-gray-400 shadow-lg p-4 rounded-[5px]">
          <h2 className=" text-[14px] lg:text-xl  font-medium font-noto text-gray-500">
            Short url
          </h2>
          <p className="text-[12px] font-normal font-noto text-red-500">{error}</p>
          <form onSubmit={handelShort} className="w-full border py-2 px-3 rounded-[5px] bg-gray-100 mt-5 border-gray-400 flex justify-between">
            <input
              value={longUrl}
              onChange={(e)=>setLongUrl(e.target.value)}
              type="text"
              className="border-none outline-none text-[14px] lg:text-xl"
              placeholder="Enter your long url"
            />
            <button className="bg-gray-300 py-2 px-5 rounded-[3px] text-[14px] font-medium lg:text-[16px] active:scale-[1.1]">
              Short
            </button>
          </form>
          {
            urlResponse&&

          <h2 className=" text-[12px] lg:text-[14px] font-normal font-noto text-gray-300 my-3 overflow-hidden ">
            Long url :{urlResponse.longUrl}
          </h2>
          }
            {
              urlResponse&&
              <div className="flex  justify-between">
            <a
              target="_blank"
              className=" text-[14px] lg:text-[16px] font-noto font-normal text-gray-500 "
              href={urlResponse.shortUrl}
            >
              Short url
              <span className="myUrl">{urlResponse.shortUrl}</span>
            </a>
            {copy ? (
              <button  className="text-lg text-green-400">
                <IoCheckmarkDoneOutline />
              </button>
            ) : (
              <button onClick={handelCopy} className="text-lg text-red-400">
                <FaRegCopy />
              </button>
            )}
          </div>
            }
        </div>
      </div>
    </>
  );
};




export default Url;
