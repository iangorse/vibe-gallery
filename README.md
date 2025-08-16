[...existing code...]
# Vibe Gallery

A modern React-based gallery web application for viewing and downloading images and videos. Built with Vite, Bootstrap, and AI-generated content.

**This application and README were completely written by AI.**

**Disclaimer:** As this project was generated entirely by AI, there may be errors or unexpected behavior. Please review and test thoroughly before using in production.

## Features

- Displays a grid of images and videos from the `public/tn` folder
- Supports both image and mp4 video files
- Responsive design for desktop and mobile
- Click to play/pause videos (auto-pauses other videos)
- Download button for each image and video
- Randomized gallery selection (up to 50 items per page)
- Stylish header with video support announcement

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/yourusername/vibe-gallery.git
	cd vibe-gallery
	```
2. Install dependencies:
	```sh
	npm install
	```

### Running the App
Start the development server:
```sh
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
vibe-gallery/
├── public/
│   └── tn/                # Images and videos (mp4) for the gallery
├── src/
│   ├── App.jsx            # Main React component
│   ├── main.jsx           # Entry point
│   ├── imageList.json     # List of gallery items (auto-generated)
│   ├── App.css, index.css # Styles
├── generateImageList.js   # Script to generate imageList.json
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # This file
```

## How It Works
- The gallery displays up to 50 random images and videos from the `public/tn` folder.
- Videos can be played/paused by clicking, and only one video plays at a time.
- Each gallery item has a download button for saving the file locally.
- The header announces video support and adapts for mobile screens.
- The `generateImageList.js` script scans the `public/tn` folder and updates `src/imageList.json`.

## Customization
- To change the number of gallery items, edit `maxImages` in `src/App.jsx`.
- To add new images/videos, place them in `public/tn` and run `node generateImageList.js`.
- To adjust styles, edit `src/App.css` and `src/index.css`.

## License
MIT

## Credits
- Built by iangorse
- Uses [React](https://react.dev/), [Vite](https://vitejs.dev/), [Bootstrap](https://getbootstrap.com/)
- AI-generated content and assets
