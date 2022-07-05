// Transforms a date to a key

export function date_to_key(date = "") {
    let return_val = parseInt(date.replaceAll('-', ''));

    return return_val;
}