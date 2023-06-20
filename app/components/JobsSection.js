import React, { useEffect, useState } from 'react'
import Job from './Job'
import { API } from '../_shared/utilities';
import { useTheme } from '@emotion/react';
import { REQUEST_METHOD } from '../_shared/constants'

const BATCHSIZE = 12;

export default function JobsSection() {
  const theme = useTheme();
  const [batchSize, setBatchSize] = useState(BATCHSIZE);
  const [jobComponents, setJobComponents] = useState([]);

  const fetchBatch = async () => {
    const response = await API('/api/job', REQUEST_METHOD.POST, null, { batchSize });
    const jobs = response.data;
    const jobComponents = jobs.map(job => <Job key={job.id} job={job} />);
    setJobComponents(jobComponents);
  }

  useEffect(() => {
    fetchBatch();
  }, [batchSize]);

  const handleLoadMore = () => {
    setBatchSize(batchSize => batchSize += BATCHSIZE);
  }

  const loadMoreBtn = jobComponents.length === 0 ? '' : (
    <div className='w-full flex justify-center mt-10 mb-24'>
      <button className='py-3 px-6 rounded-lg text-white font-bold focus:outline-none flex justify-center items-center search-btn'
        style={{ backgroundColor: `${theme.primary}` }}
        onClick={handleLoadMore}
      >Load more
      </button>
    </div>
  );

  return (
    <>
      <div className='w-screen h-fit mt-24 sm:mt-8 flex justify-center'>
        <div className='w-[70%] md:w-[90%] grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-14'>
          {jobComponents}
        </div>
      </div>

      {loadMoreBtn}
    </>
  )
}
