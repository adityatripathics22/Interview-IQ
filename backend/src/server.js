import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";


const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/health", (req, res) => {
    res.status(200).json({msg:"api is up and running"})
})

// // Root route handler
// app.get("/", (req, res) => {
//     if(ENV.NODE_ENV === "production"){
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//     } else {
//         res.status(200).json({
//             msg: "Interview-IQ API Server",
//             status: "running",
//             endpoints: {
//                 health: "/health"
//             }
//         });
//     }
// })

// make our app ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}


// app.listen(ENV.PORT, () => console.log("Server running on port :" , ENV.PORT));

const startServer = async () => {
    try {  
        await connectDB();
        app.listen(ENV.PORT, () => console.log("Server running on port :" , ENV.PORT));
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
        
    }
};

startServer();