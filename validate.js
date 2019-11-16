function validateWeight() {
    clearError();
    var weight = parseFloat(document.getElementById("weight").value);
    var type = document.getElementById("mail_type").value;
    if (isNaN(weight)) {
        displayError("Please enter a valid number");
        return false;
    }
    else {
        switch (type) {
            case 'stamped':
                if (weight > 3.5) {
                    displayError("Stamped letters cannot be more than 3.5oz")
                    return false;
                }
                else {
                    return true;
                }
                break;
            case 'metered':
                if (weight > 3.5) {
                    displayError("Metered letters cannot be more than 3.5oz")
                    return false;
                }
                else {
                    return true;
                }
                break;
            case 'flats':
                if (weight > 13) {
                    displayError("Large Flat Envelopes cannot be more than 3.5oz")
                    return false;
                }
                else {
                    return true;
                }
                break;
            case 'package':
                if (weight > 13) {
                    displayError("First Class Packages cannot be more than 3.5oz")
                    return false;
                }
                else {
                    return true;
                }
                break;
            default:
                
                break;
        }
    }
}

function displayError(errorMessage) {
    //put the passed in error into the span
    document.getElementById("errorMessage").innerHTML = errorMessage;
    document.getElementById("weight").focus();
}
function clearError() {
    document.getElementById("errorMessage").innerHTML = "";
}

window.onload = function() {
    document.getElementById("weight").addEventListener("change", validateWeight);
}
//module.exports = {validateWeight: validateWeight};