import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react'

export default function JobsDataLoading({ batchSize }) {
    const theme = useTheme();
    const [JobloadingComponents, setJobLoadingComponents] = useState([]);

    useEffect(() => {
        let jobloadingComponents_t = [];
        for (let i = 0; i < batchSize; i++) {
            jobloadingComponents_t.push(
                <div key={Math.random()}
                    className='relative pt-10 px-6 pb-7 rounded-lg'
                    style={{ backgroundColor: `${theme.jobLoadingBG}` }}>
                    <div className='absolute -top-6 rounded-xl w-12 h-12 flex items-center justify-center animate-pulse'
                        style={{ backgroundColor: `${theme.jobLoadingElems}` }}></div>
                    <div className='mb-[0.4rem] w-[60%] h-6 animate-pulse'
                        style={{ backgroundColor: `${theme.jobLoadingElems}` }}></div>
                    <div className='mb-[0.4rem] w-full h-6 animate-pulse'
                        style={{ backgroundColor: `${theme.jobLoadingElems}` }}></div>
                    <div className='mb-9 w-[25%] h-6 animate-pulse'
                        style={{ backgroundColor: `${theme.jobLoadingElems}` }}></div>
                    <div className='w-[40%] h-6 animate-pulse'
                        style={{ backgroundColor: `${theme.jobLoadingElems}` }}></div>
                </div>
            )
        }
        setJobLoadingComponents(jobloadingComponents_t);
    }, []);



    return (
        <div className='w-[70%] md:w-[90%] grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-14'>
            {JobloadingComponents}
        </div>
    )
}
