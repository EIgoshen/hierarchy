import React, {useContext} from 'react'
import {observer} from 'mobx-react'
import ItemsStore from '../store/ItemsStore'

const Container = observer((props) => {
    const store = useContext(ItemsStore);
    const id = props.item ? props.item.id : 0;
    const type = props.item ? props.item.type : "container";

    function getChildren() {
        let children = store.getChildren(id);
        return children.map(childItem => <Container key={childItem.id} item={childItem}/>)
    }

    function addBox() {
        store.addBox(id);
    }
    function addContainer() {
        store.addContainer(id);
    }
    function toggleBox() {
        store.toggleBox(id);
    }



    if (type === "box")
        return (<div className="Box" style={{backgroundColor: props.item.color}} onClick={toggleBox}></div>);
    else
        return (<div className="Container">
            {getChildren()}
            <div className="btn-add">Add
                <div className="buttons-wrapper">
                    <button className="box-btn" onClick={addBox}>Box</button>
                    <button className="cont-btn" onClick={addContainer}>Container</button>
                </div>
            </div>
        </div>);
});

export default Container;
