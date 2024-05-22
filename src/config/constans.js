//export const URLBASE = 'http://127.0.0.1:3000'
//export const URLBASE = 'http://localhost:3000'
//export const URLBASE = 'http://192.168.1.82:3000'
//export const URLBASE = 'http://incotel2.ddns.net:3000'
export const URLBASE = 'https://rendi2.onrender.com:3000'

export const ENDPOINT = {
  login: `${URLBASE}/login/`,
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