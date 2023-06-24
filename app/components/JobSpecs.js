'use client';

import { useTheme } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useScreenWidth } from "../_shared/client_utilities";
import { SCREEN, SESSION } from "../_shared/constants";

export default function JobSpecs() {
  const theme = useTheme();
  const screenWidth = useScreenWidth();
  const [companySiteBtnIsHovered, setCompanySiteBtnIsHovered] = useState(false);

  /* ensuring that sessionStorage is run solely on the client side */
  let jobSpecs;
  if(typeof window !== 'undefined') {
    jobSpecs = JSON.parse(sessionStorage.getItem(SESSION.JOB_SPECS));
  }
  const {
    company,
    logo,
    logoBackground,
    position,
    postedAt,
    contract,
    location,
    website,
    apply,
    description,
    requirements,
    role
  } = jobSpecs;

  const requirementsItems = (
    <div className="mb-7">
      {requirements?.items?.map(item =>
        <div key={Math.random()} className='flex mb-2'>
          <div className='pr-7 -mt-[0.2rem] text-lg' style={{ color: `${theme.primary}` }}>•</div>
          <div key={Math.random()} className='text-textColorGray'>{item}</div>
        </div>
      )}
    </div>
  )

  const roleItems = (
    <div className='mb-7 _custom-role-list'>
      {role?.items?.map(item =>
        <div className="flex custom-role-list-number" style={{color: `${theme.primary}`}}>
          <div className="text-textColorGray mb-2">
            {item}
          </div>
        </div>
      )}
    </div >
  )

  const handleWebsite = () => window.location.assign(website);
  const handleApply = () => window.location.href = apply;
  const handleCompanySiteMouseEnter = () => setCompanySiteBtnIsHovered(true);
  const handleCompanySiteMouseLeave = () => setCompanySiteBtnIsHovered(false);

  const companyLogoDimensions = screenWidth <= SCREEN.SMALL ? 25 : 70;
  /* theme variables */
  const mode = theme.mode;
  const mainBackgroundColor = theme.secondary;
  const companySiteColor = mode === 'l' ? theme.primary : screenWidth <= SCREEN.SMALL ? theme.primary : theme.textColor;
  const companySiteBackgroundColor = mode === 'l' ? '#c3e0de8c' : screenWidth <= SCREEN.SMALL ? '#5964E019' : '#444c57';
  const textColorGray = theme.textColorGray;
  const companySiteHoverColor = {
    'd': 'hover:bg-["#6e747c"]',
    'l': 'hover:bg-["#939BF4"]'
  }



  return (
    <div className='w-screen justify-center'>
      <div className="w-[45%] md:w-[90%] mx-auto">
        {/* company site */}
        <div className="relative -mt-12 sm:-mt-20 grid grid-cols-12 sm:flex sm:flex-col sm:items-center sm:pt-8 sm:pb-6 rounded-tr-md rounded-br-md sm:rounded-md"
          style={{ backgroundColor: `${mainBackgroundColor}` }}>
          <div className="w-32 h-32 sm:w-12 sm:h-12 col-span-3 rounded-bl-md  flex items-center justify-center sm:absolute sm:rounded-lg left-[50%] sm:translate-x-[-50%] sm:-top-6"
            style={{ backgroundColor: `${logoBackground}` }}
          ><Image alt='job logo' src={`${logo}`} width={companyLogoDimensions} height={companyLogoDimensions} />
          </div>

          <div className="flex flex-col justify-center items-start sm:items-center col-span-5">
            <div className="font-bold text-2xl sm:text-xl mb-2"
              style={{ color: `${theme.textColor}` }}
            >{company}
            </div>
            <div className="lowercase sm:mb-6 text-[#6E8098]"
            >{company}.com
            </div>
          </div>

          <div className="col-span-4 flex justify-center items-center">
            <button className={`py-3 px-6 rounded-lg text-white font-bold focus:outline-none flex justify-center items-center ${companySiteBtnIsHovered ? theme.mode === 'd' ? '_company-site-btn-dark' : '_company-site-btn': ''} `}
              style={{ color: companySiteColor, backgroundColor: companySiteBackgroundColor }}
              /* this is for handling hover states for the Company Site btn since the states differ depending on the theme */
              onMouseOver={handleCompanySiteMouseEnter} onMouseLeave={handleCompanySiteMouseLeave}
              onClick={handleWebsite}
            >Company Site
            </button>
          </div>
        </div>

        {/* full job specs */}
        <div className="mt-7 rounded-md p-12 sm:px-6" style={{ backgroundColor: mainBackgroundColor }}>
          {/* postedAt, position, apply now & location */}
          <div className="mb-7">
            <div className='mb-1 flex sm:flex-col justify-between items-center'>
              <div>
                {/* postedAt & contract */}
                <div className="flex text-[#6E8098]">
                  <span>{postedAt}</span>
                  <span className='mr-3 ml-3 font-extrabold'>.</span>
                  <span>{contract}</span>
                </div>
                {/* position */}
                <div className="text-[1.75rem] sm:text-[1.5rem] font-bold"
                  style={{ color: `${theme.textColor}` }}
                >{position}
                </div>
                {/* location */}
                <div className='text-[#5964E0] font-bold text-sm mt-2'>{location}</div>
              </div>
              {/* apply */}
              <button className='py-3 px-7 h-fit sm:mt-12 sm:w-full rounded-lg text-white font-bold focus:outline-none flex justify-center items-center primary-btn'
                style={{ backgroundColor: `${theme.primary}` }}
                onClick={handleApply}
              >Apply Now
              </button>

            </div>

          </div>

          {/* description */}
          <div className="text-textColorGray mb-7">
            <div className="">{description}</div>
          </div>

          {/* requirements*/}
          <div className="mb-7">
            <div className="mb-5 text-[1.25rem] font-bold"
              style={{ color: `${theme.textColor}` }}
            >Requirements
            </div>
            {/* requirements content */}
            <div className="mb-7 text-textColorGray">{requirements?.content}</div>
            {/* requirements items */}
            {requirementsItems}
          </div>

          {/* role */}
          <div className="mb-7">
            <div className="mb-5 text-[1.25rem] font-bold"
              style={{ color: `${theme.textColor}` }}
            >What You Will Do
            </div>
            {/* role content */}
            <div className="mb-7 text-textColorGray">{role?.content}</div>
            {/* role items */}
            {roleItems}
          </div>

        </div>

      </div>

      {/* footer */}
      <div className="w-screen py-4 sm:py-6 mt-20 flex justify-center"
        style={{ backgroundColor: mainBackgroundColor }}
      >
        <div className="w-[45%] md:w-[90%] flex justify-between items-center">
          <div className="sm:hidden flex flex-col">
            <div className="text-[1.25rem] font-bold mb-1"
              style={{ color: `${theme.textColor}` }}
            >{position}
            </div>
            <div className='text-textColorGray'>{company}</div>
          </div>

          <button className='py-3 px-8 h-fit sm:w-full rounded-lg text-white font-bold focus:outline-none flex justify-center items-center primary-btn'
            style={{ backgroundColor: `${theme.primary}` }}
            onClick={handleApply}
          >Apply Now
          </button>

        </div>
      </div>

    </div >
  )
}
