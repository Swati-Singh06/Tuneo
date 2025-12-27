# Music Player Documentation

## Table of Contents

1.  [Introduction](#introduction)
2.  [Features](#features)
3.  [Installation & Setup](#installation--setup)
4.  [Usage Guide](#usage-guide)
5.  [Technical Architecture](#technical-architecture)
    *   [File Structure](#file-structure)
    *   [HTML Structure](#html-structure)
    *   [CSS Styling](#css-styling)
    *   [JavaScript Logic](#javascript-logic)
6.  [Code Reference](#code-reference)
    *   [Data Structures](#data-structures)
    *   [Key Functions](#key-functions)
7.  [Customization](#customization)
8.  [Troubleshooting](#troubleshooting)
9.  [Contributing](#contributing)
10. [License](#license)

---

## 1. Introduction

Welcome to the **Music Player** project documentation. This application is a modern, lightweight, and responsive web-based music player designed to provide a seamless audio experience directly in your browser. Built using standard web technologies—HTML5, CSS3, and JavaScript (ES6)—it requires no external libraries or frameworks, making it fast, efficient, and easy to customize.

The player features a clean user interface with essential playback controls, a dynamic progress bar, and visual feedback for the current playing state. It is perfect for personal use, as a portfolio project, or as a foundation for a more complex audio streaming application.

---

## 2. Features

The Music Player comes packed with essential features to ensure a great user experience:

*   **Play/Pause Control**: Toggle playback with a single click. The interface updates instantly to show the current state (play icon vs. pause icon).
*   **Track Navigation**:
    *   **Next Track**: Skip to the next song in the playlist.
    *   **Previous Track**: Go back to the previous song.
*   **Progress Bar**:
    *   **Visual Indicator**: Shows the current playback position relative to the total duration.
    *   **Seek Functionality**: Click anywhere on the progress bar to jump to that specific time in the song.
*   **Volume Control**: A slider to adjust the audio volume in real-time.
*   **Playlist Management**:
    *   **Song List**: A visible list of all available songs.
    *   **Click-to-Play**: Click any song in the list to start playing it immediately.
    *   **Active Highlight**: The currently playing song is highlighted in the playlist for easy identification.
*   **Playback Modes**:
    *   **Shuffle**: Randomize the playback order of the playlist.
    *   **Repeat**: Loop the current song or playlist (implementation dependent).
*   **Visual Aesthetics**:
    *   **Album Art**: Displays the cover image for the current song.
    *   **Animations**: The album art rotates smoothly while music is playing, adding a dynamic visual element.
    *   **Responsive Design**: Adapts to different screen sizes (desktop, tablet, mobile).

---

## 3. Installation & Setup

Getting the Music Player up and running is straightforward. Follow these steps:

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge, Safari).
*   A text editor (VS Code, Sublime Text, Notepad++) if you plan to edit the code.

### Steps
1.  **Download the Code**:
    *   Clone the repository using Git:
        ```bash
        git clone https://github.com/yourusername/music-player.git
        ```
    *   Or download the ZIP file and extract it to a folder on your computer.

2.  **Prepare Audio Files**:
    *   Navigate to the `songs` directory inside the project folder.
    *   Ensure your MP3 files are placed here.

3.  **Prepare Images**:
    *   Navigate to the `images` directory.
    *   Place your album art images (PNG or JPG) here.

4.  **Launch the Player**:
    *   Locate the `index.html` file in the root directory.
    *   Double-click it to open it in your default web browser.

---

## 4. Usage Guide

Once the player is open in your browser, you can interact with it using the following controls:

*   **Play/Pause**: Click the large circular button in the center of the controls to start or stop the music.
*   **Change Songs**: Use the arrow buttons on either side of the Play button to skip forward or backward.
*   **Seek**: Click on the progress bar (the line above the controls) to jump to a specific part of the song.
*   **Adjust Volume**: Drag the volume slider to change the loudness.
*   **Select from Playlist**: Scroll through the list of songs at the bottom (if visible) and click a title to play it.
*   **Shuffle/Repeat**: Toggle these buttons to change how the playlist advances.

---

## 5. Technical Architecture

This section provides a deep dive into how the application is built.

### File Structure

```text
MusicPlayer/
├── index.html      # The main HTML document defining the structure
├── style.css       # CSS file for styling the interface and animations
├── script.js       # JavaScript file containing the application logic
├── songs/          # Directory containing MP3 audio files
│   ├── song1.mp3
│   └── ...
├── images/         # Directory containing cover art images
│   ├── cover1.png
│   └── ...
└── README.md       # This documentation file
```

### HTML Structure (`index.html`)
The HTML is structured using semantic tags. Key elements include:
*   `.music-container`: The main wrapper for the player UI.
*   `.img-container`: Holds the album art.
*   `.info`: Displays the song title and artist.
*   `audio`: The HTML5 `<audio>` element that actually plays the sound. It is controlled programmatically via JavaScript.
*   `.navigation`: Contains the Play, Prev, and Next buttons.

### CSS Styling (`style.css`)
The styling focuses on a clean, modern look.
*   **Flexbox**: Used extensively for centering elements and creating responsive layouts.
*   **Animations**: Keyframes are defined for the rotating album art (`@keyframes rotate`).
*   **Variables**: CSS variables (if used) allow for easy color theme changes.

### JavaScript Logic (`script.js`)
The core logic is event-driven.
*   **Initialization**: The script selects DOM elements and initializes the state (current song index).
*   **Event Listeners**: Attached to buttons (click), the audio element (timeupdate, ended), and the progress bar (click).
*   **State Management**: Variables like `songIndex`, `isPlaying`, etc., track the player's status.

---

## 6. Code Reference

### Data Structures

The songs are stored in an array of objects, making it easy to manage metadata.

```javascript
const songs = [
    {
        name: 'Song Title',
        artist: 'Artist Name',
        file: 'filename.mp3', // Relative path to the file in 'songs/'
        cover: 'images/cover.png' // Relative path to the image
    },
    // ... more songs
];
```

### Key Functions

*   **`loadSong(song)`**:
    *   **Purpose**: Updates the DOM elements (title, artist, audio source, image source) with data from the `song` object.
    *   **Parameters**: `song` object from the `songs` array.
    
*   **`playSong()`**:
    *   **Purpose**: Starts playback.
    *   **Actions**: Adds the 'play' class to the container (triggering animations), changes the icon to Pause, and calls `audio.play()`.

*   **`pauseSong()`**:
    *   **Purpose**: Pauses playback.
    *   **Actions**: Removes the 'play' class, changes the icon to Play, and calls `audio.pause()`.

*   **`prevSong()` / `nextSong()`**:
    *   **Purpose**: Navigates the playlist.
    *   **Logic**: Decrements or increments `songIndex`. Handles wrapping around (last to first, first to last).

*   **`updateProgress(e)`**:
    *   **Purpose**: Updates the progress bar as the song plays.
    *   **Trigger**: Called on the `timeupdate` event of the audio element.
    *   **Math**: Calculates percentage: `(currentTime / duration) * 100`.

*   **`setProgress(e)`**:
    *   **Purpose**: Seeks to a position when the user clicks the progress bar.
    *   **Logic**: Calculates the new time based on click width and total width.

---

## 7. Customization

You can easily customize the player to fit your needs.

### Adding New Songs
1.  Add the `.mp3` file to the `songs/` folder.
2.  Add the cover image to the `images/` folder.
3.  Open `script.js` and add a new object to the `songs` array:
    ```javascript
    {
        name: 'New Song',
        artist: 'New Artist',
        file: 'newsong.mp3',
        cover: 'images/newcover.png'
    }
    ```

### Changing the Theme
Open `style.css` and modify the colors. Look for the `body` background or specific button colors to change the palette.

---

## 8. Troubleshooting

### Common Issues

*   **Song Not Playing**:
    *   Check if the file path in `script.js` matches the actual filename in the `songs/` folder exactly.
    *   Ensure the file extension is correct (.mp3).
    *   Check the browser console (F12) for 404 errors.

*   **Image Not Showing**:
    *   Verify the image path in `script.js`.
    *   Ensure the image exists in the `images/` folder.

*   **Progress Bar Not Moving**:
    *   This usually happens if the song metadata hasn't loaded. Wait a moment or try reloading the page.

---

## 9. Contributing

Contributions are welcome! If you'd like to improve this project:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 10. License

This project is open-source and available under the **MIT License**. You are free to use, modify, and distribute this software for any purpose.
