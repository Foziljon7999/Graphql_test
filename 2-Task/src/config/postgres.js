const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "n9",
    password: "972517999",
    user: "postgres"
})

const fetchData = async (query, ...params) => {
    let client = await pool.connect()
    try {
        let { rows } = await client.query(query, params.length ? params: null)
        return rows
    } catch (error) {
        console.log(error);
    } finally {
        client.release()
    }
}

module.exports = fetchData