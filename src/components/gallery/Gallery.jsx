import { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';
import ToCard from '../tocard/ToCard';
import './Gallery.css'
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  useEffect(()=> { if(!token){ navigate(`/login/`) } 
                        else { setUser(username) } }, [])

  const { data } = useContext(Context);
  return (
          <div className="galeria">   
              {
                data.map((p) => { return <ToCard abono={p} key={p.id} ></ToCard>})
              }
          </div>
        )
}

export default Gallery