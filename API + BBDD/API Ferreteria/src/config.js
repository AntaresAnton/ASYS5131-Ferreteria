import dotenv from "dotenv";
dotenv.config();

export const claves ={
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
}

