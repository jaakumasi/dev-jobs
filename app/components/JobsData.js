import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Job from './Job';

export default function JobsData({ data }) {
    const [JobComponents, setJobComponents] = useState();

    useEffect(() => {
        setJobComponents(
            data.map(
                (job, idx) => (
                    <motion.div key={job.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1.5 }}
                        transition={{ duration: 0.25, delay: idx * 0.1 }}
                    >
                        <Job job={job} />
                    </motion.div>
                )
            )
        );
    }, [])


    return (
        <div className='w-[70%] md:w-[90%] grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-14'>
            {JobComponents}
        </div>
    )
}
