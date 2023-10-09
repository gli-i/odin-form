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

// check for validity when the page is first loaded
window.addEventListener('load', () => {
    for (let i = 0; i<text_inputs.length; i++){
        let validity = checkError[i](text_inputs[i]);
        showError(validity, text_inputs[i], error_msgs[i]);
    }
})

// if the password changes & there is input in confirm pw, recheck confirm pw's validity
pw_input.addEventListener('input', () => {
    validity = checkError_conpw(conpw_input);
    showError(validity, conpw_input, conpw_input.parentNode.nextElementSibling);
})

/* TEXT VALIDATION FUNCTIONS */

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

    const pwRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
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

    const pnumRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
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
    elem.className = "invalid"; // change css styling of the input
    return;
}

/* BUTTON SUBMISSION */

const form = document.querySelector('form');
const bod_right = document.querySelector('section.right');

// prevent the form from submitting unless no inputs are invalid
form.addEventListener('submit', event => {
    // prevent the form from submitting while validity check
    event.preventDefault();

    // if input is valid, submit the form
    if (checkValidity()){
        form.submit();
    // if invalid, shake the form to signify
    } else {
        bod_right.classList.add("shake");
    }
})

// check if each input is valid
function checkValidity() {
    let ret = true;
    text_inputs.forEach(e => {
        if (e.className === "invalid"){
            console.log(e);
            ret = false;
        }
    })
    return ret;
}

// once the shake animation is done, remove the class
bod_right.addEventListener('animationend', () => {
    bod_right.classList.remove("shake");
})

/* RADIO - THEME CHANGER */

const radio_inputs = document.querySelectorAll('.radio-input input');
const photo_credit = document.querySelector('.photo-credit a');

radio_inputs.forEach(radio_input => {
    radio_input.addEventListener('click', () => {
        document.documentElement.className = radio_input.value;
        setPhotoCredit(radio_input.value);
    })
})

function setPhotoCredit(colour){
    let link = "";
    let photographer = "";
    switch(colour){
        case "pink":
            link = "https://unsplash.com/@rfrsrh";
            photographer = "Foad Roshan";
            break;
        case "yellow":
            link = "https://unsplash.com/@dotjpg";
            photographer = "Jennifer Griffin";
            break;
        case "blue":
            link = "https://unsplash.com/@dunkeltaenzer";
            photographer = "Damiano Ferrante";
            break;
        default:
            link = url("https://unsplash.com/@andandoporai");
            photographer = "Rafael de Nadai";
    }
    photo_credit.setAttribute('href', link);
    photo_credit.textContent = photographer;
}