import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { About } from "./components/About";
import { ArtistPage } from "./components/ReleasePage";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Artists } from "./components/Releases";
  
export default function App(props) {
	return (
		<Router>
			<div className="mx-12">
				<Header />
				<Routes>
					<Route path="/releases" element={<Releases />} />
					<Route path="/releases/:name" element={<ReleasePage />} />
					<Route path="/about" element={<About />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}  
