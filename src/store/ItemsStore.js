import {createContext} from 'react'
import {decorate, observable, computed} from 'mobx'
import shortid from 'shortid'

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export class ItemsStore {
    items = [
        {id: 0, parentId: null, type: 'container'},
    ];

    jsonText = "";

    addBox = (parentId, color = "orange") => {
        const id = shortid.generate();
        this.items.push({
            id      : id,
            type    : "box",
            parentId: parentId,
            color   : color
        });
        return id;
    };

    addContainer = (parentId) => {
        const id = parentId == null ? 0 : shortid.generate();
        this.items.push({
            id      : id,
            type    : "container",
            parentId: parentId
        });
        return id;
    };

    getJsonModel = (item) => {
        let itemModel =  {
            type: item.type
        };
        if(item.type === "box")
            itemModel.color = item.color;
        else
            itemModel.items = this.getChildren(item.id).map(this.getJsonModel);

        return itemModel;
    };

    loadJsonModel = (model, parentId = null) => {
        if (parentId == null)
            this.items.length = 0;
        if (model.type === "container"){
            let id = this.addContainer(parentId);
            model.items.forEach(itemModel =>
                this.loadJsonModel(itemModel, id)
            )
        } else{
            this.addBox(parentId, model.color);
        }
    };

    generateJson() {
        this.jsonText =  JSON.stringify(this.getJsonModel(this.getItem(0)));
    };

    toggleBox = (id) => {
        this.items.find(item => item.id === id).color = getRandomColor();
    };

    getItem = (id) => {
        return this.items.find(item => item.id === id);
    };

    getChildren = (parentId) => {
        return this.items.filter(item => item.parentId === parentId);
    }

}

decorate(ItemsStore, {
    items  : observable,
    jsonText: observable
});

window.store = window.store || createContext(new ItemsStore());

export default window.store;
