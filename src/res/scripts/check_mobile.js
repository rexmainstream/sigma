// Does something if user device is a desktop/laptop
export function check_desktop(do_this = false) {
    if (do_this !== false) {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
            do_this();
        }
    } else {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
            return true;
        } else {
            return false;
        }
    }
}

// Does something if the user device is mobile
export function check_mobile(do_this = false) {
    if (do_this !== false) {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            do_this();
        }
    } else {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

}