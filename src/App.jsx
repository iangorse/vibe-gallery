
import './App.css';
import imageList from './imageList.json';

const images = imageList.map(name => `/images/${name}`);

function App() {
  return (
    <div className="App container">
      <h1 className="my-4 text-center">Vibe Gallery</h1>
      <div className="row g-3">
        {images.map((src, idx) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={idx}>
            <div className="card h-100 shadow-sm">
              <img src={src} alt={`Gallery ${idx + 1}`} className="card-img-top img-fluid" style={{objectFit: 'cover', maxHeight: '180px'}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
