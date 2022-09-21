const database = require("mysql")
const dotenv = require("dotenv");
const { query } = require("express");
let instance = null;

dotenv.config();

const connection = database.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    port:process.env.DB_PORT,

});


connection.connect((error)=>{
    if(error)
    console.log(error)
    console.log("db "+connection.state)
})

class dbService 
{
        static getDbInstance()
        {
            return instance?instance:new dbService();
        }

          async addUserToTable(id,username) 
        {
              const addUserResponse = await new  Promise((resolve,reject)=>{
                const query = "INSERT INTO users (id,name) VALUES(?,?);"
                connection.query(query,[id,username],(error,results)=>{
                    if(error)
                    console.log(error);
                    resolve(results);
                })
              })
              return addUserResponse;

        }

        async getAllDetails()
        {
            const getData = await new Promise((resolve,reject)=>{
              const query = "SELECT name from users;";
              connection.query(query,(error,results)=>{
                if(error)
                console.log(error)
                resolve(results);
              })
            })
            return getData;
        }

}

module.exports = dbService;

