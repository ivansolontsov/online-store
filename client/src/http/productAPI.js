import { $host, $authHost } from "./index";



// POST
export const createCategory = async (category) => {
    const { data } = await $authHost.post('api/categories', category)
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/products', product)
    return data
}


// GET
export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand')
    return data
}

export const fetchCategory = async () => {
    const { data } = await $host.get('api/categories')
    return data
}

export const fetchProducts = async (categoryId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/products', {
        params: {
            categoryId, brandId, page, limit
        }
    })
    return data
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/products/' + id)
    return data
}