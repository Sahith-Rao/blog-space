import mongoose from "mongoose"


const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@auth.hl5uv.mongodb.net/?retryWrites=true&w=majority&appName=auth`;
    try {
        await mongoose.connect(URL);
        console.log('Databse connected');
    } catch(err){
        console.log('Error');

    }

}

export default Connection;