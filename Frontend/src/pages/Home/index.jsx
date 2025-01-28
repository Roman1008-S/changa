import React from 'react';
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

import About from '../../components/About'
import ServiceList from '../../components/Services'
import FacilitatorList from '../../components/Facilitators'
import FaqList from '../../components/Faq'
import Testimonial from '../../components/Testimonial'


const Home = () => {
    return (
        <>
            <section className='hero__section pt-[60px] 2xl:h-[800px]'>
                <div className="container">
                    <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
                        <div>
                            <div className='lg:w-[570px]'>
                                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                                    Find & Book Your Perfect Facilitators
                                </h1>
                                <p className='text__para'>
                                    Every day, we are faced with challenges that push us to grow, evolve, and seek deeper meaning in our lives. <br />
                                    Sometimes, we feel like we’re not enough—not confident enough, skilled enough, balanced enough, or fulfilled enough.

                                    But what if you found the right guide to empower you on your journey? <br />
                                    Someone to help you heal, learn, and thrive? Whether you’re looking to discover mindfulness, build resilience, enhance your creativity, or deepen your spiritual practice, finding the right facilitator can make all the...
                                </p>
                                <button className='btn' style={{ textTransform: "uppercase" }}>
                                    Learn More
                                </button>
                            </div>

                            <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                                <div>
                                    <img src="assets/image/tick.svg" alt="Tick" />
                                    <p className='text__para'>Best Price Guarantee</p>
                                </div>

                                <div>
                                    <img src="assets/image/worldwide.svg" alt="worldwide" />

                                    <p className='text__para'>4000+ Facilitators Worldwide</p>
                                </div>

                                <div>
                                    <img src="assets/image/world.svg" alt="world" />

                                    <p className='text__para'>1% to the Planet</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-[30px] justify-end'>
                            <div>
                                <video autoPlay muted loop playsInline style={{ borderRadius: "20px" }}>
                                    {/* <source src="assets/image/psilocybin.webm" type="video/webm" />
                                    <source src="assets/image/psilocybin.mp4" type="video/mp4" /> */}
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className='lg:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>Providing the Best Facilitation Services</h2>
                        <p className='text__para text-center'>
                            Expert Support for Everyone. Our network offers unmatched, professional facilitators to guide and support your goals effectively.
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
                    <div className='py-[30px] px-5'>
                        <div className='flex items-center justify-center'>
                            <img src="assets/image/icon01.png" alt="" />
                        </div>

                        <div className='mt-[30px]'>
                            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                Find A Facilitators
                            </h2>
                            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                                Expert Guidance for Every Need. Connect with skilled facilitators for workshops, team-building, and personal growth to achieve your goals.
                            </p>


                            <Link to='/facilitators' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] 
                            mx-auto flex items-center group hover:bg-primaryColor hover:border-none justify-center'>
                                <BsArrowRight className='group-hover:text-white w-6 h-5' />
                            </Link>
                        </div>
                    </div>

                    <div className='py-[30px] px-5'>
                        <div className='flex items-center justify-center'>
                            <img src="assets/image/icon02.png" alt="Icon2" />
                        </div>

                        <div className='mt-[30px]'>
                            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                Find A Location
                            </h2>
                            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                                Convenient care, wherever you are. Discover our locations near you for expert services and world-class support.
                            </p>


                            <Link to='/facilitators' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] 
                            mx-auto flex items-center group hover:bg-primaryColor hover:border-none justify-center'>
                                <BsArrowRight className='group-hover:text-white w-6 h-5' />
                            </Link>
                        </div>
                    </div>

                    <div className='py-[30px] px-5'>
                        <div className='flex items-center justify-center'>
                            <img src="assets/image/icon03.png" alt="Icon3" />
                        </div>

                        <div className='mt-[30px]'>
                            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                Book Appointment
                            </h2>
                            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                                Your health, your schedule. Easily book an appointment with our experts for personalized care at your convenience.
                            </p>


                            <Link to='/facilitators' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] 
                            mx-auto flex items-center group hover:bg-primaryColor hover:border-none justify-center'>
                                <BsArrowRight className='group-hover:text-white w-6 h-5' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            < About />

            <section>
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>Our Facilitation Services</h2>
                        <p className='text__para text-center'>
                            World-Class Support for Everyone. Our network offers unmatched, expert facilitators to meet your needs and drive success.
                        </p>
                    </div>
                    <ServiceList />
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="flex items-center justify-between flex-col lg:flex-row">

                        <div className='xl:w-[670px]'>
                            <h2 className="heading">
                                Get Virtual Facilitation  <br /> Anytime, Anywhere.
                            </h2>

                            <ul className="pl-4">
                                <li className="text__para">
                                    1.  Schedule your session directly with ease.
                                </li>
                                <li className="text__para">
                                    2. Search for skilled facilitators and contact them directly.
                                </li>
                                <li className="text__para">
                                    3. View available facilitators, and use the online scheduling tool to book a session at your convenience.
                                </li>
                            </ul>

                            <Link to='/'>
                                <button className="btn">Learn More</button>
                            </Link>
                        </div>

                        <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
                            <img src="assets/image/feature.png" className="xl:h-[450px]" alt="feature" style={{ borderRadius: "20px" }} />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>Our Great Facilitators</h2>
                        <p className='text__para text-center'>
                            World-Class Support for Everyone. <br />Our network offers unmatched, expert facilitation services to help you achieve your goals.
                        </p>
                    </div>
                    <FacilitatorList />
                </div>
            </section>

            <section>
                <div className="container">
                    <div className='flex justify-between gap-[50px] lg:gap-0'>
                        <div className='w-1/3 hidden md:block'>
                            <img src="assets/image/Faq.png" alt="Faq" className='xl:h-[450px]' style={{ borderRadius: "20px" }} />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <h2 className='heading'>
                                Most Questions By Our Beloved Clients
                            </h2>
                            <FaqList />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>What Our Clients Say</h2>
                        <p className='text__para text-center'>
                            World-Class Support for Everyone. <br />Our Facilitation Services Offer Unmatched, Expert Guidance and Solutions.
                        </p>
                    </div>
                    <Testimonial />
                </div>
            </section>
        </>
    )
}

export default Home