import { custom_alert } from "./add_alert";

//Checks if the data within the sting is valid returns true or false. If false also shows an error message
export function string_validation(the_string, min_length, max_length, data_input_description) {
    switch (true) {
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