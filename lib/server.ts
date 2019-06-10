import app from "./app";
import {DataAccess} from './DataAccess';

// const PORT = 8080;
var port = process.env.PORT||8080;

console.log("trying to connect to MongoDB");
DataAccess.connect();

app.listen(port, () => {
    console.log('Express server listening on port '+port);
    
})