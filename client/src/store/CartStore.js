import { makeAutoObservable } from 'mobx'

export default class CartStore {
    constructor() {
        this._cartItems = []

        makeAutoObservable(this)
    }

    setCartItems(product) {
        this._cartItems.push(product);
        console.log(this._cartItems)
    }

    get cartItems() {
        return this._cartItems
    }
}