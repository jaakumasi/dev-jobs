import Image from 'next/image';
import React, { useContext } from 'react'
import iconSun from '../../public/assets/desktop/icon-sun.svg';
import iconMoon from '../../public/assets/desktop/icon-moon.svg';
import { Context } from '../_shared/context';
import { useTheme } from '@emotion/react';

export default function DashBoardBG() {
    const { toggleTheme } = useContext(Context);
    const theme = useTheme();

    return (
        <div className='relative flex justify-center dashboard-bg -mt-5'>
            <div className='w-[70%] mt-[4.4rem] md:w-[90%] md:mt-[4rem] sm:mt-[3rem] flex z-10 justify-between font-bold'>
                <div className='text-white text-3xl'>devjobs</div>
                <div className='mt-2 flex h-fit items-center' onClick={() => {
                    toggleTheme();
                    document.querySelector('.check').classList.toggle('active');
                }}>
                    <Image alt='sun icon' src={iconSun} className='w-5 h-5' />
                    <div className='w-12 h-6 ml-4 mr-4 py-3 px-1 bg-white rounded-xl flex items-center check'>
                        <div className='w-4 h-4 rounded-full check-toggle' style={{backgroundColor: `${theme.primary}`}}></div>
                    </div>
                    <Image alt='moon icon' src={iconMoon} className='w-3 h-3' />
                </div>
            </div>

        </div>
    )
}

