import { useTheme } from '@emotion/react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import qs from 'qs';
import { CLIENT_ROUTES } from '../_shared/constants';

export default function Job({ job }) {
    const theme = useTheme();
    const [URL, setURL] = useState('');

    const handleNavigate = () => {
        const queryString = qs.stringify(job);
        setURL(`${CLIENT_ROUTES.JOB_SPECS}/?${queryString}`);
    };

    return (
        <Link href={URL}>
            <div className='relative pt-10 px-6 pb-7 rounded-lg'
                style={{ backgroundColor: `${theme.secondary}` }}
                onClick={handleNavigate}
            >
                {/* company logo */}
                <div className='absolute -top-6 rounded-xl w-12 h-12 flex items-center justify-center' style={{ backgroundColor: `${job.logoBackground}` }}>
                    <Image alt='job logo' src={`${job.logo}`} width={25} height={25} />
                </div>

                {/* postedAt & contract */}
                <div className='flex mb-4 text-[#0668EA]' style={{ color: `${theme.mode === 'd' ? theme.textColorGray : ''}` }}>
                    <span>{job.postedAt}</span>
                    <span className='mr-3 ml-3 font-extrabold'>.</span>
                    <span>{job.contract}</span>
                </div>

                <div className='font-bold text-lg mb-1 hover:text-[#6E8098]' // <<<<<<<<<<<<<<<<<<<<<
                    style={{ color: `${theme.textColor}` }}
                >{job.position}
                </div>

                <div className='mb-9 text-[#0668EA]'
                    style={{ color: `${theme.mode === 'd' ? theme.textColorGray : ''}` }}
                >{job.company}
                </div>

                <div className='text-[#5964E0] font-bold'>{job.location}</div>
            </div>
        </Link>
    )
}
