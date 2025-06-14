# SEO Check Tool Chrome Extension

A Chrome extension that helps analyze and improve SEO for your content.

## Features

- Real-time SEO analysis
- Title and meta description validation
- Image optimization checks
- Content structure analysis
- Dark/Light theme support
- Responsive design

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. For development with auto-reload:
   ```bash
   npm run dev
   ```

## Loading the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `SEO-Check-tool` directory

## Project Structure

```
SEO-Check-tool/
├── src/
│   ├── config/         # Configuration files
│   ├── utils/          # Utility functions
│   ├── validators/     # Validation logic
│   ├── analyzers/      # SEO analysis logic
│   ├── components/     # UI components
│   ├── styles/         # CSS styles
│   └── index.js        # Entry point
├── dist/               # Built files
├── manifest.json       # Extension manifest
├── package.json        # Dependencies
└── webpack.config.js   # Build configuration
```

## Building for Production

1. Run the build command:
   ```bash
   npm run build
   ```
2. The built files will be in the `dist` directory
3. Load the extension in Chrome using the `dist` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 