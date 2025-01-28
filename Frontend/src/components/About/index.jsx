import React from 'react'

import { Link } from 'react-router-dom'

const About = () => {
    return (
        <section>
            <div className="container">
                <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>

                    <div className='relative w-4/4 lg:w-1/2 xl:w-[570px] z-10 order-2 lg:first-letter:order-1'>
                        <img src="assets/image/about.png" alt="" className='xl:h-[450px]' style={{ borderRadius: "20px" }} />
                        <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                        <h2 className='heading'>Proud To Be One Of The Nations Best</h2>
                        <p className='text__para'>
                            Welcome to our Facilitators Appointment App!
                            Our goal is to provide seamless access to expert facilitators, enabling you to book sessions, track progress,
                            and receive personalized support—all in one place.
                        </p>

                        <p className="text__para mt-[30px]">
                            Introducing our revolutionary Facilitators Appointment App!
                            Designed with your convenience in mind, it simplifies the booking process, offers real-time availability,
                            and ensures secure communication with professional facilitators.
                            Experience hassle-free facilitation at your fingertips!
                        </p>

                        <Link to='/about'>
                            <button className="btn">Learn More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About