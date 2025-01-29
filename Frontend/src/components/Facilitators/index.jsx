import { facilitators } from '../../constant/data/facilitators.js'
import Card from './card.jsx'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

function FacilitatorList() {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                {facilitators.map(facil => {
                    return (
                        <SwiperSlide key={facil.id}  className='mb-[50px]'>
                            <div className='py-[30px] px-5 rounded-3'>
                                <Card facilitator={facil} />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default FacilitatorList