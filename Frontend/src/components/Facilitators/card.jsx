import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Card = ({ facilitator }) => {
    const navigate = useNavigate();

    const { name, specialization, avgRating, totalRating, photo, totalStudents, hospital } = facilitator
    return (
        <div className='p-3 lg:p-5'>
            <div>
                <img src={photo} className='w-full h-400' alt="" style={{ borderRadius: "20px" }} />
            </div>
            <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
                {name}
            </h2>
            <div className='mt-2 lg:mt-4 flex items-center justify-between'>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px]
                leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                    {specialization}
                </span>
                <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[6px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                        <img src="assets/image/Star.png" alt="Start" />
                        {avgRating}
                    </span>
                    <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
                        ({totalRating})
                    </span>
                </div>
            </div>

            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div>
                    <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>
                        + {totalStudents} Students
                    </h3>
                    <p className='text-[14px] leading-6 font-[400] text-textColor'>
                        At {hospital}
                    </p>
                </div>

                <button className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]
                   flex items-center group hover:bg-[#dcf5f7] hover:border-none justify-center'
                    onClick={() => {
                        navigate(`/facilitators/:${facilitator.id}`)
                    }}
                >
                    <BsArrowRight className='group-hover:text-[#181A1E] w-6 h-5' />
                </button>

            </div>

        </div>
    )
}

export default Card