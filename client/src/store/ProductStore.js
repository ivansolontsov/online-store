import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    constructor() {
        this._categories = []
        this._brands = []
        this._products = []
        this._selectedCategory = []
        this._selectedBrand = []
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
        this._selectedCategory.push(category)
    }

    removeFromSelectedCategory(category) {
        this._selectedCategory = this._selectedCategory.filter(element => element.id !== category.id);
    }

    setSelectedBrand(brand) {
        this._selectedBrand.push(brand)
    }

    removeFromSelectedBrand(brand) {
        this._selectedBrand = this._selectedBrand.filter(element => element.id !== brand.id);
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

    get categoryIds() {
        let Ids = []
        this._selectedCategory.map((category) => {
            Ids.push(category.id);
        })
        Ids = Ids.join('')
        return Ids
    }

    get brandIds() {
        let Ids = []
        this._selectedBrand.map((brand) => {
            Ids.push(brand.id);
        })
        Ids = Ids.join('')
        return Ids
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