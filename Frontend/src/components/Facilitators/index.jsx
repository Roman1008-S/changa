import { facilitators } from '../../constant/data/facilitators.js'
import Card from './card.jsx'


function FacilitatorList() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            {facilitators.map(facil => {
                return (
                    <Card key={facil.id} facilitator={facil} />
                )
            })}
        </div>
    )
}

export default FacilitatorList