import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import About from "./components/About";
import Statistik from "./components/Statistik";
import Informasi from "./components/Informasi";
import Footer from "./components/Footer";
import EyeCheck from "./components/EyeChect";
import Hasil from "./components/Hasil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Navbar />
                <Hero />
                <Statistik />
                <Informasi />
                <About />
                <Footer />
              </Layout>
            }
          />

          {/* Eye Check Page */}
          <Route path="/eye-check" element={<EyeCheck />} />

          {/* Result Page */}
          <Route path="/hasil" element={<Hasil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
