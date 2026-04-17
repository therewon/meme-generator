import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");

  const memeRef = useRef<HTMLDivElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;

    const canvas = await html2canvas(memeRef.current);
    const imageData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageData;
    link.download = "meme.png";
    link.click();
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Meme Generator</h1>

        <div className="controls">
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label>Top Text</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Enter top text"
            />
          </div>

          <div className="form-group">
            <label>Bottom Text</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Enter bottom text"
            />
          </div>

          <button onClick={downloadMeme} className="download-btn">
            Download Meme
          </button>
        </div>

        <div className="preview-section">
          <h2>Preview</h2>

          <div className="meme" ref={memeRef}>
            {image ? (
              <>
                <img src={image} alt="Meme" className="meme-image" />
                <h2 className="meme-text top">{topText}</h2>
                <h2 className="meme-text bottom">{bottomText}</h2>
              </>
            ) : (
              <div className="empty-preview">
                <p>Select an image to create your meme</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;