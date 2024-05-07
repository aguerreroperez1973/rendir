import { useContext } from 'react';
import { Context } from '../../contexts/Context';
import ToCard from '../tocard/ToCard';
import './Gallery.css'

const Gallery = () => {

 const {data} = useContext(Context);
 //console.log(data)

  return (
          <div className="galeria">   
              {
                data.map((p) => {
                                  return <ToCard abono={p} key={p.id} ></ToCard>
                })
              }
          </div>
        )
}

export default Gallery