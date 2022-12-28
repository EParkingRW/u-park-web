import Secure from "../../helpers/secureLs";

const Config = {
    getHeaders,
    paymentRate:23,
    minimumMoneyToPay:300,
    totalSlots: 560,
}
export default Config

export function getHeaders(){
    return {
        headers: { Authorization: `Bearer ${Secure.getToken()}` }
    }
}