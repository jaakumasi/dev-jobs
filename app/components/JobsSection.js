import React, { Suspense, useContext, useEffect, useState } from 'react'
import { useTheme } from '@emotion/react';
import Job from './Job'
import { API } from '../_shared/server_utilities';
import { REQUEST_METHOD, SERVER_ROUTES } from '../_shared/constants'
import { Context } from '../_shared/context';
import JobsData from './JobsData';
import JobsDataLoading from './JobsDataLoading';

{/* number of jobs to fetch at a time if no filter obj is provided */ }
const BATCHSIZE = 12;

export default function JobsSection() {
  const theme = useTheme();
  const [batchSize, setBatchSize] = useState(BATCHSIZE);
  const [jobMatchIsEmpty, setJobMatchIsEmpty] = useState(false);
  const [showLoadMoreBtn, setShowMoreBtn] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const isJobsLoaded = fetchedData.length > 0 && !isFetchingData;
  const { filterObj } = useContext(Context);


  const fetchBatch = async () => {
    setIsFetchingData(true);

    const response = await API(
      SERVER_ROUTES.JOB,  // endpoint
      REQUEST_METHOD.POST, // method
      null, // headers - default application/json
      { batchSize, filterObj } // body
    );
    const jobs = response.data;
    if (jobs.length === 0) {
      setFetchedData([]);
      setBatchSize(BATCHSIZE); /* reset batch size */
      setJobMatchIsEmpty(true);
    }
    else {
      setFetchedData(jobs);
      setJobMatchIsEmpty(false);
    }

    setIsFetchingData(false);
  }



  useEffect(() => {
    fetchBatch();
  }, [batchSize, filterObj]);


  /* The 'Load More' button displays only when the job batch has been fetched 
   * or when the filtered batchsize is greater than BATCHSIZE
   */
  useEffect(() => {
    const jobCount = fetchedData.length;
    console.log('job count: ', jobCount);

    if (jobCount !== 0 && jobCount >= BATCHSIZE) {
      // setIsJobsLoaded(true);
      setShowMoreBtn(true);
    }
    else {
      // setIsJobsLoaded(false);
      setShowMoreBtn(false);
    }

  }, [fetchedData, jobMatchIsEmpty]);


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
    (
      <div className='w-full flex justify-center -mt-10 mb-24 sm:mb-20'>
        <button className='py-3 px-6 rounded-lg text-white font-bold focus:outline-none flex justify-center items-center search-btn'
          style={{ backgroundColor: `${theme.primary}` }}
          onClick={handleLoadMore}
        >Load more
        </button>
      </div>
    ) : '';



  return (
    <>
      <div className='w-screen h-fit mt-24 sm:mt-8 pb-24 flex justify-center'>
        {
          jobMatchIsEmpty ?
            EmptyMatchComponent :
            isJobsLoaded ?
              <JobsData data={fetchedData} /> :
              <JobsDataLoading batchSize={BATCHSIZE} />
        }
      </div>

      {LoadMoreBtn}
    </>
  )
}
