import { Addons, ISwiftSellSDK } from "./types/cart";
import { ApiClient } from "./apiClient";
import { paramsObjectToQueryString } from "./utils/helpers";
import { ObjectType } from "./types/others";


export class SwiftSellSDK implements ISwiftSellSDK {
    private apiClient: ApiClient;

    constructor(apiKey: string) {
        this.apiClient = new ApiClient(apiKey)
    }

    private async handleError(response: Response) {
        console.error(response);
        const messageResponse = await response.json();
        throw new Error(`Request failed with Status code: ${response.status} and message ${JSON.stringify(messageResponse)}`)
    }

    public async getSiteConfig(): Promise<any> {
        const response = await this.apiClient.GET(`/customer/get_site_config`);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async getProducts(
        page: number = 1,
        perPage: number = 10,
        searchQuery: string,
        filterByCategories: string
    ): Promise<any> {
        const params = paramsObjectToQueryString({
            per_page: perPage,
            page: page,
            search_query: searchQuery,
            filter_by_categories: filterByCategories
        })
        const response = await this.apiClient.GET(`/customer/get_products${params}`);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async getSingleProduct(productId: string): Promise<any> {
        const response = await this.apiClient.GET(`/customer/get_single_product?productId=${productId}`);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async addToCart(
        productId: string,
        quantity: number,
        cartId?: string,
        productOptionContentName?: string,
        addons?: Addons[]): Promise<any> {
        const response = await this.apiClient.POST(`/customer/add_item_to_cart`, {
            product_id: productId,
            quantity,
            cart_id: cartId,
            productOptionContentName,
            addons
        } as ObjectType);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async removeFromCart(productId: string,
        cartId: string): Promise<any> {
        const response = await this.apiClient.POST(`/customer/remove_item_to_cart`, {
            product_id: productId,
            cart_id: cartId,
        });
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;

    }

    public async getCartItems(cartId: string): Promise<any> {
        const response = await this.apiClient.GET(`/customer/get_cart_item?cart_id=${cartId}`);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async checkoutCart(): Promise<any> {

    }
}












