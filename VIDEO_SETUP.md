# Video Background Setup

## Adding Your Video Background

To add a video background to the main interface section (where "Explore My Work" and "Watch My Story" buttons appear), follow these steps:

### 1. Video Requirements
- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds (will loop automatically)
- **File Size**: Keep under 10MB for optimal loading
- **Content**: Cinematic, subtle background that doesn't distract from text

### 2. File Placement
Place your video file in the `public/videos/` directory:
```
public/
  videos/
    hero-background.mp4  ← Your video file here
  images/
    hero-poster.jpg      ← Optional: poster image for loading
```

### 3. Poster Image (Optional)
- **Format**: JPG or PNG
- **Resolution**: 1920x1080
- **Purpose**: Shows while video loads, fallback if video fails
- **Content**: A frame from your video or a related image

### 4. Video Optimization Tips
- Use a video compressor like HandBrake or online tools
- Aim for 2-5MB file size
- Consider using WebM format for better compression (add as additional source)
- Test on mobile devices for performance

### 5. Testing
After adding your video:
1. Run `npm run dev`
2. Navigate to the homepage
3. Click "Enter My World" button
4. Verify video plays smoothly in the background
5. Check mobile performance

### 6. Fallback Behavior
- If video fails to load, the poster image will show
- If no poster image, the original gradient background will remain
- Video is muted and loops automatically
- Autoplay may be restricted on some browsers (graceful fallback)

### 7. Customization
To change video settings, edit `components/VideoBackground.tsx`:
- Adjust overlay opacity (currently `bg-black/40`)
- Change autoplay behavior
- Modify video positioning (`object-cover`)

## Current Video Paths
- Video: `/videos/hero-background.mp4`
- Poster: `/images/hero-poster.jpg`

Replace these files with your own content!
