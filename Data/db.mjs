import pg from "pg"

const config = {
    connectionString: process.env.DB_CREDENTIALS,
    ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : { "rejectUnauthorized": false }
}


async function create(statment, ...values) {
    console.log("statement used: " + statment)
    return await runQuery(statment, ...values);
}

async function update(statment, ...values) {
    return await runQuery(statment, ...values);
}

async function read(statment, ...values) {
    try {
        let prom = await runQuery(statment, ...values);
        console.log("in dbManager read: "+prom)
        return prom
    } catch (error) {
        
    }
}

async function readAllIds(statment, ...values) {
    return await runQuery(statment, ...values);
}

async function purge(statment, ...values) {
    return await runQuery(statment, ...values);
}



async function runQuery(statment, ...values) {
    const client = new pg.Client(config);

    try {
        client.connect();
        const result = await client.query(statment, [...values])

        if (result.rowCount <= 0) {
            throw new Error("No records created");
        }
        console.log("in runQuery: "+ result)
        return result.rows[0];

    } catch (error) {

        // Feilhåndtering 
        console.error(error);
        return null;

    } finally {
        client.close();
    }
}


const DbManager = { create, update, read, readAllIds, purge};

export default DbManager;