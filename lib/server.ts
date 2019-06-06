import app from "./app";
import {DataAccess} from './DataAccess';

const PORT = 8080;

console.log("trying to connect to MongoDB");
DataAccess.connect();

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})