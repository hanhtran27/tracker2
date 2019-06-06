import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    
    // static DB_CONNECTION_STRING:string = 'mongodb://localhost:3000/sample';
    static DB_CONNECTION_STRING:string = 'mongodb+srv://admin:admin123@cluster0-vddun.azure.mongodb.net/sample?retryWrites=true&w=majority';


    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        
        if(this.mongooseInstance) return this.mongooseInstance;
        this.mongooseConnection  = Mongoose.connection;

        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING, { useNewUrlParser: true });
        return this.mongooseInstance;
    }
    
}

export {DataAccess};