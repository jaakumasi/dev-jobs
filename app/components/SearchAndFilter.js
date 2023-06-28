import React, { useContext, useRef, useState } from 'react'
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import searchIcon from '../../public/assets/desktop/icon-search.svg';
import locationIcon from '../../public/assets/desktop/icon-location.svg';
import checkIcon from '../../public/assets/desktop/icon-check.svg';
import filterIcon from '../../public/assets/mobile/icon-filter.svg';
import { useScreenWidth } from '../_shared/client_utilities';
import { SCREEN } from '../_shared/constants';
import { Context } from '../_shared/context';


export default function SearchAndFilter() {
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const screenWidth = useScreenWidth();

  const { updateFilterObj } = useContext(Context);

  const titleInputRef = useRef('');
  const locationInputRef = useRef('');
  const titleInputRefMobile = useRef('');
  const locationInputRefMobile = useRef('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSetFullTimeOnly = () => setFullTimeOnly(!fullTimeOnly);
  const handleSearch = () => {
    let titleOrCompany, location;
    if (screenWidth <= SCREEN.SMALL) {
      titleOrCompany = titleInputRefMobile.current.value;
      location = locationInputRefMobile.current?.value;
    } else {
      titleOrCompany = titleInputRef.current.value;
      location = locationInputRef.current.value;
    }
    /* close modal for mobile devices when search btn is active */
    setShowModal(false);
    updateFilterObj({ titleOrCompany, location, fullTimeOnly });
  }

  /* trigger search when enter key is hit in the search fields */
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSearch();      
    }
  }

  const bgColor = fullTimeOnly ? `${theme.primary}` : theme.mode === 'd' ? '#575757' : '#E7E7E7';
  const checkBox = (
    <div className={`w-5 h-5 mr-2 p-1 flex justify-center items-center rounded-sm ${fullTimeOnly ? '' : 'fulltime-only-checkbox'} hover:cursor-pointer`}
      style={{ backgroundColor: `${bgColor}` }}
      onClick={handleSetFullTimeOnly}
    >
      {fullTimeOnly ? <Image alt='check icon' src={checkIcon} className='' /> : ''}
    </div>
  )

  const mobileModal = showModal && screenWidth <= SCREEN.SMALL ?
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
          <div className='py-7 pl-5 flex border-b-[1px]' style={{ borderColor: `${theme.background}` }}>
            <Image alt='filter icon' src={locationIcon} className='mr-4' />
            <input type='text' className='w-full pr-5 focus:outline-none'
              style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
              ref={locationInputRefMobile}
              placeholder='Filter by location...' />
          </div>
          {/* modal body */}
          <div className='p-5'>
            <div className='flex items-center'>
              {checkBox}
              <div className='font-bold min-w-fit' style={{ color: `${theme.textColor}` }}>Full time only</div>
            </div>
            <button className='py-3 mt-5 w-full text-center rounded-lg text-white font-bold focus:outline-none search-btn'
              style={{ backgroundColor: `${theme.primary}` }}
              onClick={handleSearch}
            >Search
            </button>
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
          <input type='text'
            ref={titleInputRef}
            className='w-full pr-5 focus:outline-none' style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
            placeholder={`${screenWidth >= SCREEN.LARGE ? 'Filter by title, company, expertise...' : 'Filter by title...'}`}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='py-7 pl-6 sm:pl-4 flex col-span-3 md:col-span-4 hover:cursor-pointer border-r-[1px]' style={{ borderColor: `${theme.background}` }}>
          <Image alt='filter icon' src={locationIcon} className='mr-4' />
          <input type='text'
            ref={locationInputRef}
            className='w-full pr-5 focus:outline-none' style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
            placeholder='Filter by location...'
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='pl-7 md:pl-5 sm:pl-4 flex items-center col-span-4 md:col-span-4'>
          {checkBox}
          <div className='font-bold min-w-fit' style={{ color: `${theme.textColor}` }} >
            {`${screenWidth >= SCREEN.LARGE ? 'Full time only' : 'Full time'}`}
          </div>
          <button
            className='py-3 3xl:px-14 2xl:px-8 md:px-4 sm:px-5 ml-7 2xl:ml-5 md:ml-5 rounded-lg text-white font-bold focus:outline-none search-btn'
            style={{ backgroundColor: `${theme.primary}` }}
            onClick={handleSearch}
          >Search
          </button>
        </div>
      </div>

      {/* mobile display only [Search & filter] */}
      <div className='hidden sm:block -mt-[6.5rem] w-[90%] h-20 z-10 rounded-lg' style={{ backgroundColor: `${theme.secondary}` }}>
        <div className='flex px-5'>
          <input type='text' className='focus:outline-none py-7 pr-5 w-[75%]'
            style={{ backgroundColor: `${theme.secondary}`, color: `${theme.textColor}` }}
            ref={titleInputRefMobile}
            placeholder='Filter by title...' />
          <div className='w-[15%] py-7' >
            <Image alt='filter icon' src={filterIcon} onClick={handleShow} />
          </div>
          <div className='w-[20%] h-full my-auto flex items-center justify-center'
            onClick={handleSearch}>
            <button
              className='w-full py-3 rounded-lg text-white font-bold focus:outline-none flex justify-center items-center search-btn'
              style={{ backgroundColor: `${theme.primary}` }}

            ><svg width="24" height="24"><path d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z" fill="#FFFFFF" fillRule="nonzero" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile modal */}
      {mobileModal}


    </div>
  )
}
