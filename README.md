# Simple Blog Space

A clean, minimalist, light-themed full-stack blog application.

---

## 🚀 Key Features

* **Compose Stories**: Write blog posts with a title, body text, and a cover image.
* **Smart Media Uploads**: Automatic dual-storage image handling:
  * Uploads to **Cloudinary** if keys are supplied.
  * Falls back to local storage inside `server/uploads/` if offline or keys are missing.
* **Dynamic Search**: Instant keyword search filter with a `300ms` typing debounce.
* **Pagination**: Simple page-by-page navigation feed.
* **Minimalist UI**: Clean, light-themed interface with sticky forms and modern styling.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, and native ES6 JavaScript Modules.
* **Backend**: Node.js & Express.
* **Database**: MongoDB (via Mongoose ODM).
* **Storage**: Cloudinary API or local file storage.

---

## 📂 Project Directory Structure

```text
blog/
├── client/              # Frontend Assets
│   ├── components/      # UI Modular Components
│   │   ├── PostForm.js  # Preview and submit compose form
│   │   ├── PostFeed.js  # Render post cards in the feed
│   │   ├── SearchBar.js # Debounced search bar input
│   │   └── Pagination.js# Pagination arrows and indicators
│   ├── services/
│   │   └── api.js       # Core fetch calls to Backend API
│   ├── index.html       # HTML Shell
│   ├── style.css        # Clean CSS Styles
│   └── app.js           # Core client coordinator
│
└── server/              # Backend API
    ├── config/          # Cloudinary configuration settings
    ├── middleware/      # Multer file uploading limits and filters
    ├── controllers/     # Route controller handlers
    ├── models/          # Mongoose Post model schemas
    ├── routes/          # Express route bindings
    ├── uploads/         # Local file uploads cache directory
    ├── .env             # Local configuration secrets
    └── server.js        # Server Entry Point
```

---

## 💻 Local Installation & Setup

1. **Install Dependencies**:
   Navigate to the `server/` directory and install the packages:
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**:
   Create a file named `.env` inside the `server/` directory and add the following keys:
   ```env
   PORT=5000
   
   # MongoDB URI (Local or MongoDB Atlas)
   MONGODB_URI=mongodb://127.0.0.1:27017/blog_db
   
   # Optional Cloudinary storage keys
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Start MongoDB**:
   Ensure MongoDB is running locally on your computer on port `27017`.

4. **Run the Server**:
   Start the Node.js server inside the `server/` directory:
   ```bash
   npm start
   ```

5. **Access the App**:
   Open your browser and visit: **[http://localhost:5000](http://localhost:5000)**.
