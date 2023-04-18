import { BrowserRouter as Rourer, Route, Routes} from "react-router-dom";

import { MainPage, ComicsPage, Page404, SingleComic } from "../pages";
import AppHeader from "../appHeader/AppHeader";

import decoration from '../../resources/img/vision.png';

const App = () => {

    return (
        <Rourer>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComic/>}/>
                        <Route path="*" element={ <Page404/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </Rourer>
    )
}

export default App;