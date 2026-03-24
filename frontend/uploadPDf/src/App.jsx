import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/convert",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.docx";
      a.click();
    } catch (err) {
      alert("Conversion failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>PDF → Word Converter</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={convertFile}>
        {loading ? "Converting..." : "Convert"}
      </button>
    </div>
  );
}

export default App;