/* TEXT/EMAIL INPUT VALIDATION */

const text_inputs = document.querySelectorAll('.text-input input');
const error_msgs = document.querySelectorAll('.error-msg');

const pw_input = document.querySelector('#user-password');
const conpw_input = document.querySelector('#confirm-password');

// for every text input, check for validity when input
for (let i = 0; i<text_inputs.length; i++){
    text_inputs[i].addEventListener('input', () => {
        // check for validity using corres function
        let validity = checkError[i](text_inputs[i]);

        // update error message
        showError(validity, text_inputs[i], error_msgs[i]);
    })
}

// if the password changes & there is input in confirm pw, recheck confirm pw's validity
pw_input.addEventListener('input', () => {
    if (conpw_input.value != ""){
        validity = checkError_conpw(conpw_input);
        showError(validity, conpw_input, conpw_input.parentNode.nextElementSibling);
    }
})


// First Name
// req: not empty
function checkError_fname(elem) {
    return (elem.value !== "") ? "valid" : "empty";
}
// Email
// req: not empty, valid email
function checkError_email(elem) {
    const input = elem.value;
    if (!input) return "empty";

    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (emailRegExp.test(input)) ? "valid" : "notemail";
}
// Password
// req: not empty, len >= 8, min 1 number, 1 symbol, 1 upcase, 1 lowcase
function checkError_pw(elem) {
    const input = elem.value;
    if (!input) return "empty";
    if (input.length < 8) return "shortpw";

    const pwRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])$/;
    return (pwRegExp.test(input)) ? "valid" : "weakpw";
}
// Last Name
// req: none
function checkError_lname(elem) {
    return "valid";
}
// Phone Number
// req: valid phone number
function checkError_pnum(elem) {
    const input = elem.value;
    if (!input) return "valid";

    const pnumRegExp = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
    return (pnumRegExp.test(input)) ? "valid" : "notpnum";
}
// Confirm Password
// req: not empty, matches password input
function checkError_conpw(elem) {
    const input = elem.value;
    if (!input) return "empty";
    return (input === pw_input.value) ? "valid" : "pwnomatch";
}

// array of checkErrors, in order to match w/ corresponding elem
let checkError = [
    checkError_fname,
    checkError_email,
    checkError_pw,
    checkError_lname,
    checkError_pnum,
    checkError_conpw
]

// input: type of validity error, the elem, & the error msg element to change
function showError(validity, elem, msg_elem){
    switch(validity){
        case "valid":
            msg_elem.textContent = "";
            elem.className = "";
            return;
        case "empty":
            msg_elem.textContent = "Required";
            break;
        case "notemail":
            msg_elem.textContent = "Input a valid email address";
            break;
        case "shortpw":
            msg_elem.textContent = "Minimum 8 characters long";
            break;
        case "weakpw":
            msg_elem.textContent = "At least one lowercase, one uppercase, one number and one symbol";
            break;
        case "notpnum":
            msg_elem.textContent = "Input a valid phone number";
            break;
        case "pwnomatch":
            msg_elem.textContent = "Does not match password";
            break;
    }
    elem.className = "invalid";
    return;
}