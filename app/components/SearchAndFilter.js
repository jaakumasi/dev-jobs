import React, { useState } from 'react'
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import searchIcon from '../../public/assets/desktop/icon-search.svg';
import locationIcon from '../../public/assets/desktop/icon-location.svg';
import checkIcon from '../../public/assets/desktop/icon-check.svg';
import filterIcon from '../../public/assets/mobile/icon-filter.svg';
import { useScreenWidth } from '../_shared/utilities';
import { SCREEN } from '../_shared/constants';


export default function SearchAndFilter() {
  const theme = useTheme();
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const screenWidth = useScreenWidth();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSetFullTimeOnly = () => setFullTimeOnly(!fullTimeOnly);

  const bgColor = fullTimeOnly ? `${theme.primary}` : '#E7E7E7';
  const checkBox = <div className={`w-5 h-5 mr-2 p-1 flex justify-center items-center rounded-sm fulltime-only-checkbox hover:cursor-pointer`}
    style={{ backgroundColor: `${bgColor}` }}
    onClick={handleSetFullTimeOnly}
  >
    {fullTimeOnly ? <Image alt='check icon' src={checkIcon} className='' /> : ''}
  </div>

  const mobileModal = showModal ?
    (
      // modal container
      < div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[9999]'>
        {/* modal backdrop  */}
        < div className='absolute top-0 left-0 right-0 bottom-0'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleClose}
        ></div >
        {/* modal content */}
        <div className='relative w-[90%] rounded-lg' style={{ backgroundColor: `${theme.secondary}` }}>
          {/* modal header */}
          <div className='py-7 pl-6 flex border-b-[1px]' style={{ borderColor: `${theme.background}` }}>
            <Image alt='filter icon' src={locationIcon} className='mr-4' />
            <input type='text' className='w-full pr-5 focus:outline-none' style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
              placeholder='Filter by location...' />
          </div>
          {/* modal body */}
          <div className='p-5'>
            <div className='flex items-center'>
              {checkBox}
              <div className='font-bold min-w-fit' style={{ color: `${theme.textColor}` }}>Full time only</div>
            </div>
            <button className='py-3 mt-5 w-full text-center rounded-lg text-white font-bold focus:outline-none search-btn' style={{ backgroundColor: `${theme.primary}` }}>Search</button>
          </div>
        </div>
      </div >
    ) : '';




  return (
    <div className='relative w-screen flex justify-center'>
      {/* Search & filter for tablets and PC */}
      <div className='sm:hidden -mt-10 md:-mt-12 w-[70%] md:w-[90%] h-20 z-10 rounded-lg grid grid-cols-12' style={{ backgroundColor: `${theme.secondary}` }}>
        <div className='py-7 pl-6 sm:pl-4 flex col-span-5 md:col-span-4 hover:cursor-pointer border-r-[1px]' style={{ borderColor: `${theme.background}` }}>
          <Image alt='search icon' src={searchIcon} className='mr-4' />
          <input type='text' className='w-full pr-5 focus:outline-none' style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
            placeholder={`${screenWidth >= SCREEN.LARGE ? 'Filter by title, company, expertise...' : 'Filter by title...'}`} />
        </div>
        <div className='py-7 pl-6 sm:pl-4 flex col-span-3 md:col-span-4 hover:cursor-pointer border-r-[1px]' style={{ borderColor: `${theme.background}` }}>
          <Image alt='filter icon' src={locationIcon} className='mr-4' />
          <input type='text' className='w-full pr-5 focus:outline-none' style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
            placeholder='Filter by location...' />
        </div>
        <div className='pl-7 md:pl-5 sm:pl-4 flex items-center col-span-4 md:col-span-4'>
          {checkBox}
          <div className='font-bold min-w-fit' style={{ color: `${theme.textColor}` }} >{`${screenWidth >= SCREEN.LARGE ? 'Full time only' : 'Full time'}`}</div>
          <button className='py-3 3xl:px-14 2xl:px-8 md:px-4 sm:px-5 ml-7 2xl:ml-5 md:ml-5 rounded-lg text-white font-bold focus:outline-none search-btn' style={{ backgroundColor: `${theme.primary}` }}>Search</button>
        </div>
      </div>

      {/* mobile display only [Search & filter] */}
      <div className='hidden sm:block -mt-[6.5rem] w-[90%] h-20 z-10 rounded-lg' style={{ backgroundColor: `${theme.secondary}` }}>
        <div className='flex px-5'>
          <input type='text' className='focus:outline-none py-7 pr-5 w-[75%]' style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
            placeholder='Filter by title...' />
          <div className='w-[15%] py-7' >
            <Image alt='filter icon' src={filterIcon} onClick={handleShow} />
          </div>
          <div className='w-[20%] h-full my-auto flex items-center justify-center'>
            <button className='w-full py-3 rounded-lg text-white font-bold focus:outline-none flex justify-center items-center search-btn' style={{ backgroundColor: `${theme.primary}` }}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z" fill="#FFFFFF" fillRule="nonzero" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile modal */}
      {mobileModal}


    </div>
  )
}
