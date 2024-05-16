import { createRef } from "react";
import { ENDPOINT } from '../../config/constans.js';

function upLoadFile() {

  const fileInput = createRef();

  const onSubmit = async (e) =>{

    e.preventDefault();
    const formData = new FormData;
    formData.set("imageCar", fileInput.current.files[0]);

    try {
        const response = await fetch(ENDPOINT.subirImagen, {
          method: "POST",
          body: formData
        });

        const parsedResponse = await response.json();
          if(response.ok){
             alert("file upload");
          } else { console.error("file not upload")}

  } catch (e) {
    console.error(e.message)
  }
}
  
  return (
    <div>

      <form action="" onSubmit={onSubmit}>
        <input type="file" name="imageCar" ref={fileInput}/>  
        <input type="submit" value="submit"/>
      </form>

    </div>
  )

}

export default upLoadFile; 