import { custom_alert } from "./add_alert";

//Checks if the data within the sting is valid returns true or false. If false also shows an error message
export function string_validation(the_string, min_length, max_length, data_input_description) {

    // Invalid symbols brackets
    const invalid_symbols = /[{}\[\]<>()]/


    switch (true) {
        case invalid_symbols.test(the_string):
            custom_alert(`Invalid ${data_input_description}`, 'error',`Your ${data_input_description} cannot include characters such as [], (), {} and <>.`)            
            return false;
        case the_string.length < min_length:
            custom_alert(`Invalid ${data_input_description}`, 'error',`Your ${data_input_description} must be at least ${min_length} characters.`)            
            return false
            break;
        case the_string.length > max_length:
            custom_alert(`Invalid ${data_input_description}`, 'error', `Your ${data_input_description} must be less than ${max_length} characters.`)
            return false
            break;
        default:
            return true;
    }
}