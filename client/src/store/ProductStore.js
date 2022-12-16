import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    constructor() {
        this._categories = []
        this._brands = []
        this._products = []
        this._selectedCategory = {}
        this._selectedBrand = {}
        this._currentPage = 1
        this._totalCount = 0
        this._pageLimit = 4

        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setProducts(products) {
        this._products = products;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    setCurrentPage(number) {
        this._currentPage = number
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setPageLimit(limit) {
        this._pageLimit = limit
    }

    get categories() {
        return this._categories
    }

    get brands() {
        return this._brands
    }

    get products() {
        return this._products
    }

    get selectedCategory() {
        this.setCurrentPage(1)
        return this._selectedCategory
    }

    get selectedBrand() {
        this.setCurrentPage(1)
        return this._selectedBrand
    }

    get currentPage() {
        return this._currentPage
    }

    get totalCount() {
        return this._totalCount
    }

    get pageLimit() {
        return this._pageLimit
    }
}