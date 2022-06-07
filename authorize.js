const ADMIN_USERNAME = 'admin'
let ADMIN_PASSWORD = 'qwerty123'

function authorize({ username, password }) {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

module.exports = authorize
