## QR & Barcode Studio
 
A sleek browser-based tool for generating and scanning QR codes and barcodes. Turn any link or text into a code in seconds, or point it at a photo and instantly decode what's inside. No installs, no server, no accounts — just open the file and go.
 
## Features
 
1. Instant QR code generation from any link or text.
2. Barcode generation in 6 formats (CODE128, CODE39, EAN-13, EAN-8, UPC-A, ITF-14).
3. Image decoding — upload or drag-and-drop a photo to read any QR code or barcode in it.
4. One-click PNG download for every generated code.
5. Drag-and-drop file support with live image preview.
6. Auto-detects links in decoded results and gives you an "Open link" button.
7. Copy-to-clipboard for decoded text.
8. 100% client-side — nothing you generate or scan is ever uploaded anywhere.
9. Dark, scanner-inspired UI with zero setup required.
    
## Built With
 
HTML, CSS, and vanilla JavaScript — plus three lightweight libraries:
- **qrcodejs** for QR generation
- **JsBarcode** for barcode generation
- **@zxing/library** for decoding
  
## Installation
 
1. Clone the repository.
   `git clone https://github.com/your-username/qr-barcode-studio.git`
2. Go to the project folder.
   `cd qr-barcode-studio`
3. Open the app.
   `open index.html` — or just double-click the file.
No dependencies to install and no build step. An internet connection is needed to fetch the three libraries above.
 
## Hosting on GitHub Pages
 
This is a fully static site, so GitHub Pages works out of the box — no changes needed.
 
1. Push `index.html`, `style.css`, and `script.js` to a GitHub repository.
2. Go to **Settings → Pages** in the repo.
3. Under **Source**, pick the branch (usually `main`) and the root folder, then save.
4. Your app will be live at `https://your-username.github.io/qr-barcode-studio/` within a minute or two.
## How to Use
 
**Generate a code**
| Step | Action |
|---|---|
| 1 | Paste a link or type any text |
| 2 | Choose QR code or Barcode |
| 3 | Pick a barcode format (if applicable) |
| 4 | Click **Generate code** |
| 5 | Click **Download PNG** to save it |
 
**Scan a code**
| Step | Action |
|---|---|
| 1 | Drop an image or click to upload one |
| 2 | Click **Decode image** |
| 3 | View the decoded text and format |
| 4 | Click **Open link** or **Copy** |
 
## Project Structure
 
```
qr-barcode-studio/
│
├── index.html      # markup and structure
├── style.css        # all styling
├── script.js         # app logic (generate + decode)
└── README.md
```
 
## Screenshot
 
Add your screenshots here:
 
- Generate tab
- Scan tab
- Decoded result
## Future Improvements
 
1. Offline mode with bundled libraries (no CDN dependency).
2. Batch generation from a list of links.
3. Custom QR colors and embedded logos.
4. Camera-based live scanning.
5. History of recently generated and scanned codes.
## Author
 
Made by Saker Munshi
 
## License
 
This project is licensed under the MIT License.
 
## Support
 
If you find this useful, give it a ⭐ on GitHub!
