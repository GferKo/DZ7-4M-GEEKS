import './App.css';
import MainPage from './pages/MainPage';
import React from 'react';
import TodoPage from './pages/TodoPage';
import PokemonPage from './pages/PokemonPage';


function App() {
    return (
        <div className="App">
            {/*<MainPage/>*/}
            <TodoPage/>
            {/*<PokemonPage/>*/}
        </div>
    );
}


export default App;
