import { faqs } from '../../constant/data/faqs.js'
import FaqItem from './item.jsx'

function FaqList() {
  return (
    <ul className='mt-[38px]'>
        {faqs.map ((item , index ) => (
            <FaqItem item= {item} key={index}/>
        ))}
    </ul>
  )
}

export default FaqList