import {Routes, Route, Outlet} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Favorites from './pages/Favorites';

function Root() {
    return (
        <>
            <Nav />
            <main className='container'>
                <Outlet />
            </main>
        </>
    );
}

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Root />}>
                <Route index element={<Home />}/>
                <Route path='coin/:id' element={<Coin />}/>
                <Route path='favorites' element={<Favorites />}/>
            </Route>
        </Routes>
    );
}

export default Router;