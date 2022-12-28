export function convertFromStringToDate(responseDate:string) {
    const date = new Date(responseDate.replace(' ', 'T'));
    return(date)
}
export function validatePhoneNumber(input_str:string) {
    let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
}