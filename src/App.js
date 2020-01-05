import React, {useContext} from 'react';
import './App.css';
import Container from "./components/Container";
import ItemsStore from './store/ItemsStore'
import {observer} from "mobx-react";

const App = observer(() =>{
    const store = useContext(ItemsStore);
    const jsonText = store.json;
    let jsonLoadText = "";


    function loadFromJson(){
        store.loadJsonModel(JSON.parse(jsonLoadText));
    }
    function handleChange(event) {
        jsonLoadText = event.target.value;
    }

    return (
        <div className="App">
            <Container/>

            <div className="create-json-container">
                <textarea onChange={handleChange}></textarea>
                <button className="create-json" onClick={loadFromJson}>Build</button>
            </div>
            <div className="build-json-container">
                <div className="json-text">{store.jsonText}</div>
                <button className="create-json" onClick={()=>{store.generateJson()}}>Create JSON</button>
            </div>

        </div>
    );
});

export default App;
