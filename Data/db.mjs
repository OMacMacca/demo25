import pg from "pg"
const { Client } = pg

const Config = {
    connectionString: process.env.DB_CREDENTIALS,
    ssl: (process.env.DB_SSL === true) ? process.env.DB_SSL : false,
}

const client = new Client(Config)

await client.connect()

function create(statement, ...values) {

}