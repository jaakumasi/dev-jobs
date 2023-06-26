import React, { Suspense, useContext, useEffect, useState } from 'react'
import { useTheme } from '@emotion/react';
import Job from './Job'
import { API } from '../_shared/server_utilities';
import { REQUEST_METHOD, SERVER_ROUTES } from '../_shared/constants'
import { Context } from '../_shared/context';

{/* number of jobs to fetch at a time if no filter obj is provided */ }
const BATCHSIZE = 12;

export default function JobsSection() {
  const theme = useTheme();
  const [batchSize, setBatchSize] = useState(BATCHSIZE);
  const [JobComponents, setJobComponents] = useState([]);
  const [jobMatchIsEmpty, setJobMatchIsEmpty] = useState(false);
  const [showLoadMoreBtn, setShowMoreBtn] = useState(false);
  const { filterObj, isDOMLoaded } = useContext(Context);

  const fetchBatch = async () => {
    const response = await API(
      SERVER_ROUTES.JOB,  // endpoint
      REQUEST_METHOD.POST, // method
      null, // headers - default application/json
      { batchSize, filterObj } // body
    );
    const jobs = response.data;
    if (jobs.length === 0) {
      /* reset batch size */
      setBatchSize(BATCHSIZE);
      setJobMatchIsEmpty(true);
      setJobComponents([]);
    }
    else {
      const jobComponents =
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className='w-[70%] md:w-[90%]  grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-14'>
            {jobs.map(job => <Job key={job.id} job={job} />)}
          </div>
        </Suspense>
      setJobMatchIsEmpty(false);
      setJobComponents(jobComponents);
    }
  }

  useEffect(() => {
    fetchBatch();
  }, [batchSize, filterObj]);

  /* The 'Load More' button displays only when the job batch has been fetched 
   * or when the filtered batchsize is greater than BATCHSIZE
  */
  useEffect(() => {
    if (isDOMLoaded) {
      if ((JobComponents.props?.children.props.children.length !== 0 &&
        JobComponents.props?.children.props.children.length >= BATCHSIZE) ||
        jobMatchIsEmpty
      ) setShowMoreBtn(true);
      else setShowMoreBtn(false);
    }

  }, [JobComponents, jobMatchIsEmpty])

  const handleLoadMore = () => {
    setBatchSize(batchSize => batchSize += BATCHSIZE);
  }

  const EmptyMatchComponent = (
    <div className='w-[70%] md:w-[90%] py-5 rounded-lg text-center'
      style={{ color: `${theme.textColor}`, backgroundColor: `${theme.secondary}` }}>
      No jobs match the given criteria
    </div>
  )

  const LoadMoreBtn = showLoadMoreBtn ?
    (<div className='w-full flex justify-center -mt-10 mb-24 sm:mb-20'>
      <button className='py-3 px-6 rounded-lg text-white font-bold focus:outline-none flex justify-center items-center search-btn'
        style={{ backgroundColor: `${theme.primary}` }}
        onClick={handleLoadMore}
      >Load more
      </button>
    </div>) : '';

  return (
    <>
      <div className='w-screen h-fit mt-24 sm:mt-8 pb-24 flex justify-center'>
        {jobMatchIsEmpty ? EmptyMatchComponent : JobComponents}
      </div>

      {LoadMoreBtn}
    </>
  )
}
