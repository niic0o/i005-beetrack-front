export type DateToFormat = Date | string;

export const dateBirthDateFormatter = (date: DateToFormat): string => {
    let splitBirthdate: string[];
    let formattedBirthdate: string;

    if(date instanceof Date) {
        splitBirthdate = date.toISOString().split('T')[0].split('-');
        formattedBirthdate = `${splitBirthdate[2]}-${splitBirthdate[1]}-${splitBirthdate[0]}`
    } else {
        splitBirthdate = date.split('T')[0].split('-');
        formattedBirthdate = `${splitBirthdate[2]}-${splitBirthdate[1]}-${splitBirthdate[0]}`
    }

    return formattedBirthdate;
}

export const dateFormatter = (date: DateToFormat): string => {

    if(date instanceof Date) {
        return date.toUTCString();
    }

    return new Date(date).toUTCString();
    // return new Date(date).toUTCString();
}