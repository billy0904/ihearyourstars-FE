import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Router/Home";
import Footer from "./components/Footer";
import BodyWrapper from "./components/BodyWrapper";
import Loading from "./Router/Loading";
import Musicbox from "./Router/Musicbox";
import MusicboxPlay from "./Router/MusicboxPlay";
import Music from "./Router/Music";
import MusicPlay from "./Router/MusicPlay";
import MusicName from "./Router/MusicName";
import MusicShare from "./Router/MusicShare";

function MainContent() {
  const location = useLocation();
  const isLoading = location.pathname === "/loading";

  return (
    <BodyWrapper isLoading={isLoading}>
      <Routes>
        <Route path="/music/share/:songId" element={<MusicShare />} />
        <Route path="/music/name/:songId" element={<MusicName />} />
        <Route path="/music/play/:songId" element={<MusicPlay />} />
        <Route path="/music/:songId" element={<Music />} />

        <Route path="/musicbox/play/:songId" element={<MusicboxPlay />} />
        <Route path="/musicbox/:songId" element={<Musicbox />} />

        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BodyWrapper>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
