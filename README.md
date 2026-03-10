# Video Streaming App

A full-stack video streaming application that allows users to upload videos, convert them to HLS format, and stream them in the browser.

## Features

- Video upload via HTTP POST
- Automatic conversion to HLS (HTTP Live Streaming) format using FFmpeg
- Static file serving for video segments
- React frontend with Video.js player for playback
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- FFmpeg installed on your system
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd video_streaming
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd video_Streming_front-end
   npm install
   cd ..
   ```

## Usage

1. Start the backend server:
   ```bash
   node index.js
   ```
   The server will run on http://localhost:8000

2. Start the frontend development server:
   ```bash
   cd video_Streming_front-end
   npm run dev
   ```
   The frontend will be available at http://localhost:5173 (or next available port)

3. Upload a video file:
   - Send a POST request to `http://localhost:8000/upload` with a file field named "file"
   - The server will process the video and return a videoUrl for streaming

4. Play the video:
   - Use the returned videoUrl in the VideoPlayer component
   - The app includes a hardcoded example video for testing

## API Endpoints

- `GET /` - Health check
- `POST /upload` - Upload and process video file
  - Body: multipart/form-data with "file" field
  - Returns: JSON with videoUrl and lessonId
- `GET /uploads/*` - Serve static video files

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Multer (file uploads)
  - FFmpeg (video processing)
  - UUID (unique identifiers)

- **Frontend:**
  - React
  - Vite
  - Video.js (video player)
  - Tailwind CSS (styling)

## Project Structure

```
video_streaming/
├── index.js                 # Backend server
├── package.json             # Backend dependencies
├── uploads/                 # Generated video files (ignored)
├── video_Streming_front-end/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── VideoPlayer.jsx  # Video.js wrapper
│   │   └── ...
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
└── README.md                # This file
```

## Notes

- Videos are converted to HLS format with 10-second segments
- Uploaded files are stored temporarily before processing
- The frontend includes a hardcoded video URL for demonstration
- Ensure FFmpeg is installed and accessible in your PATH</content>
<parameter name="filePath">e:\projects\video_streaming\README.md