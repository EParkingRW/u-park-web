import Secure from "../../helpers/secureLs";

const Config = {
    getHeaders
}
export default Config

export function getHeaders(){
    return {
        headers: { Authorization: `Bearer ${Secure.getToken()}` }
    }
}