import imageList from "./imageList.json";

const imageBasePath = "/images/";

function App() {
  return (
  <div className="App container-fluid">
      <h1 className="my-4 text-center">Vibe Gallery</h1>
      <div className="row g-0">
        {imageList.map((filename, idx) => (
          <div className="col-6 col-md-4 col-lg-3 p-0" key={idx}>
            <div className="card h-100 border-0 rounded-0">
              <img
                src={imageBasePath + filename}
                className="card-img-top rounded-0"
                alt={filename}
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
