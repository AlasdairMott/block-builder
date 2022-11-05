import { useEffect } from 'react';
import Viewport3d from './3d/Viewport3d';
import './App.css';
import { gridActions } from './store/grid';
import { useAppDispatch } from './store/hooks';
import { decompress } from './utils/compresser';

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const path = window.location.pathname.substring(1);
        if (path) {
            const json = decompress(path);
            dispatch(gridActions.readFile(json));
            // remove the path from the url
            window.history.replaceState({}, document.title, "/");
        }
    }, [dispatch]);

    return (
        <div className="App" >
            <Viewport3d />
            {/* <Preview/> */}
        </div>
    );
}

export default App;
