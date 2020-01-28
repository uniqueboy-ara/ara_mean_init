mongooseLoger = function (ex) {
    let errors = ''
    for (property in ex.errors) {
        errors += `${ex.errors[property].message}`;
        console.log(ex.errors[property].message);
    }
    return errors;
}

module.exports = { Log: mongooseLoger };