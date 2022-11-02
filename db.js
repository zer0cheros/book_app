exports.db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './database.db'
    },
    useNullAsDefault: true
})