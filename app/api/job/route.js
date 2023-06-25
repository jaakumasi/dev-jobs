import { JOB_CONTRACT } from '@/app/_shared/constants';
import { NextRequest, NextResponse } from 'next/server';
import fuzzy from 'fuzzy';
import localDB from '.././localdb/data.json';
import { toLowerCase } from '@/app/_shared/server_utilities';
import { } from 'constants';

export const POST = async (req) => {
    const { batchSize, filterObj } = await req.json();
    const { titleOrCompany: toc, location: l, fullTimeOnly: f } = filterObj;
    // console.log('batchSize: ', batchSize, 'filterObj: ', filterObj);

    const isFilterObjEmpty = Object.keys(filterObj).length === 0;
    let batchElements;
    if (!toc && !l && !f) {
        batchElements = localDB.slice(0, batchSize);
    }
    else {
        /* filter obj is of the form {titleOrCompany: string, location: string , fullTimeOnly: boolean} */
        batchElements = localDB.filter(
            ({ company, position, location, contract }) => {
                const tocIsDefined = toc ? true : false;
                const locationIsDefined = l ? true : false;

                if (tocIsDefined && !locationIsDefined) {
                    if (fuzzy.filter(toLowerCase(toc), [toLowerCase(company)]).length !== 0 ||
                        fuzzy.filter(toLowerCase(toc), [toLowerCase(position)]).length !== 0) {
                        return f ? contract === JOB_CONTRACT.FULLTIME : true;
                    }
                }
                else if (!tocIsDefined && locationIsDefined) {
                    if (fuzzy.filter(toLowerCase(l), [toLowerCase(location)]).length !== 0) {
                        return f ? contract === JOB_CONTRACT.FULLTIME : true;
                    };
                }
                else if (tocIsDefined && locationIsDefined) {
                    if ((fuzzy.filter(toLowerCase(toc), [toLowerCase(company)]).length !== 0 ||
                        fuzzy.filter(toLowerCase(toc), [toLowerCase(position)]).length !== 0) &&
                        fuzzy.filter(toLowerCase(l), [toLowerCase(location)]).length !== 0) {
                        return f ? contract === JOB_CONTRACT.FULLTIME : true;
                    }
                }
                else if (!tocIsDefined && !locationIsDefined) {
                    return f ? contract === JOB_CONTRACT.FULLTIME : true;
                }
                else {
                    return false;
                }
            });
    }
    return NextResponse.json({ data: batchElements }, { status: 200 })
}
