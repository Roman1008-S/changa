import Card from '../../components/Facilitators/card'
import { facilitators } from '../../constant/data/facilitators'
import Testimonial from '../../components/Testimonial'

const Facil = () => {
    return (
        <>
            <section>
                <div className="container text-center">
                    <h2 className="heading">
                        Find A Facilitator
                    </h2>
                    <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
                        <input
                            type="search"
                            placeholder='Search Facilitators'
                            className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
                        />
                        <button className="btn mt-0 rounded-[0px] rounded-r-md">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
                        {facilitators.map(facil => (
                            <Card key={facil.id} facilitator={facil} />
                        ))}
                    </div>
                </div>
            </section>
            { /* Testimonials Section */}
            <section>
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>What Our Patients Say</h2>
                        <p className='text__para text-center'>World-Class Care For Everyone. Our Health System Offers Unmatched,
                            Expert Health Care.
                        </p>
                    </div>

                    <Testimonial />
                </div>
            </section>
        </>
    )
}

export default Facil