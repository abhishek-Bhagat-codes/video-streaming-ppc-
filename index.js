import express from "express";
import {v4 as uuidv4} from "uuid";
import multer from "multer";
import cors from "cors";
import path from "path";

import {exec} from "child_process";
import fs from "fs";
import { error } from "console";
import { stderr, stdout } from "process";







const app = express();


// multer file setUp 
const storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"./uploads")
    },
    filename:function(req,file,cd){
        cd(null,file.fieldname + "-"+uuidv4()+path.extname(file.originalname))
    }
})


// multer config
const upload = multer({storage:storage});

app.use(cors({
    origin:["*"],
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use("/uploads", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, express.static("uploads"));


app.get("/",(req,res)=>{

    return res.json({
        "message":"Hello Abhishek"
    })
})


app.post("/upload",upload.single("file"),(req,res)=>{
    console.log("file uploaded !");
    const lessonId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/cou/${lessonId}`;
    const hlsPath = `${outputPath}/index.m3u8`;
    console.log("hlsPath ",hlsPath);


    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath,{recursive:true});
    }
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`


    exec(ffmpegCommand,(error,stdout,stderr) =>{
        if(error){
            console.log(error);
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        const videoUrl = `http://localhost:8000/upload/cou/${lessonId}/index.m3u8`;

        res.json({
            message:"video processed",
            videoUrl:videoUrl,
            lessonId:lessonId
        })
    })
})

app.listen(8000,()=>{
    console.log("Server is runing on posr 8000");
})