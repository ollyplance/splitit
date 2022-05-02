import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./test.css";
function TestComponent() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState("");
  const [progress, setProgress] = useState(0);
  const worker = createWorker({
    logger: (m) => {
      console.log(m);
      setProgress(Math.round(parseFloat(m.progress) * 100.0));
    },
  });
  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e : any) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri : string = reader.result as string;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="App">
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      {progress < 100 && progress > 0 && <div>
        <div className="progress-label">Progress ({progress}%)</div>
        <div className="progress-bar">
          <div className="progress" style={{width: `${progress}%`}} ></div>
        </div>
      </div>}
      <p>{ocr}</p>
      <div className="display-flex">
        <img src={imageData} alt="" />
        <p>{ocr}</p>
      </div>
    </div>
  );
}
export default TestComponent;