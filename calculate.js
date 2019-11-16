function getPrice(mail, weight) {
    var price = 0.0;
    switch (mail) {
        case 'stamped':
            if (weight > 3) {
                price = 1.00;
            }
            else if (weight > 2) {
                price = 0.85;
            }
            else if (weight > 1) {
                price = 0.70;
            }
            else {
                price = 0.55;
            }
            break;
        case 'metered':
            if (weight > 3) {
                price = 0.95;
            }
            else if (weight > 2) {
                price = 0.80;
            }
            else if (weight > 1) {
                price = 0.65;
            }
            else {
                price = 0.50;
            }
            break;
        case 'flats':
            if (weight > 12) {
                price = 2.80;
            }
            else if (weight > 11) {
                price = 2.65;
            }
            else if (weight > 10) {
                price = 2.50;
            }
            else if (weight > 9) {
                price = 2.35;
            }
            else if (weight > 8) {
                price = 2.20;
            }
            else if (weight > 7) {
                price = 2.05;
            }
            else if (weight > 6) {
                price = 1.90;
            }
            else if (weight > 5) {
                price = 1.75;
            }
            else if (weight > 4) {
                price = 1.60;
            }
            else if (weight > 3) {
                price = 1.45;
            }
            else if (weight > 2) {
                price = 1.30;
            }
            else if (weight > 1) {
                price = 1.15;
            }
            else {
                price = 1.00;
            }
            break;
        case 'package':
            if (weight > 12) {
                price = 5.71;
            }
            else if (weight > 11) {
                price = 5.19;
            }
            else if (weight > 10) {
                price = 5.19;
            }
            else if (weight > 9) {
                price = 5.19;
            }
            else if (weight > 8) {
                price = 5.19;
            }
            else if (weight > 7) {
                price = 4.39;
            }
            else if (weight > 6) {
                price = 4.39;
            }
            else if (weight > 5) {
                price = 4.39;
            }
            else if (weight > 4) {
                price = 4.39;
            }
            else if (weight > 3) {
                price = 3.66;
            }
            else if (weight > 2) {
                price = 3.66;
            }
            else if (weight > 1) {
                price = 3.66;
            }
            else {
                price = 3.66;
            }
            break;
        default:
            break;
    }
    return price;
}

function getName(mail) {
    switch (mail) {
        case 'stamped':
            return 'Stamped Letter';
            break;
        case 'metered':
            return 'Metered Letter';
            break;
        case 'flats':
            return 'Large Flat Envelope';
            break;
        case 'package':
            return 'First Class Package';
            break;
        default:
            return "invalid mail type";
            break;
    }
}


function calculatePostage(req, res) {
    var mail = req.query.mail_type;
    var weight = parseFloat(req.query.weight);
    var price = getPrice(mail, weight);
    var mail_type = getName(mail);
    var results = {mail_type: mail_type, weight: weight, price: price};
    res.render('calculation', results);
}

module.exports = {calculatePostage: calculatePostage};