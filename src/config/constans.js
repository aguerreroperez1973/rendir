//export const URLBASE = 'http://localhost:3000'
export const URLBASE = 'http://incotel2.ddns.net:3000'

//const loginUrl = '/public/user.json'; 
//const abonoUrl = '/public/abonos.json';

export const ENDPOINT = {
  login: `${URLBASE}/login/`,
  //login: `${URLBASE}/login/${loginUrl}`,
  //abonos: `${URLBASE}/abono/${abonoUrl}`
  abonos: `${URLBASE}/abonos/`,
  abono: `${URLBASE}/abono/`,
  closed: `${URLBASE}/abono/closed/:id`,
  users: `${URLBASE}/lista/`,
  user: `${URLBASE}/users/`,
  userget: `${URLBASE}/user/`,
  rendicion: `${URLBASE}/rendicion/`,
  rendiciones: `${URLBASE}/rendiciones/`,
  delrendicion: `${URLBASE}/delrendicion/`,
  subirImagen: `${URLBASE}/media/`,
}