import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { About } from "./components/About";
import { ArtistPage } from "./components/ArtistPage";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Artists } from "./components/Artists";
  
export default function App(props) {
	return (
		<Router>
			<div className="mx-12">
				<Header />
				<Routes>
					<Route path="/artists" element={<Artists />} />
					<Route path="/artists/:name" element={<ArtistPage />} />
					<Route path="/about" element={<About />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}  
