import { Addons, ISwiftSellSDK } from "./types/cart";
import { ApiClient } from "./apiClient";
import { paramsObjectToQueryString } from "./utils/helpers";
import { ObjectType } from "./types/others";


export class SwiftSellSDK implements ISwiftSellSDK {
    private apiClient: ApiClient;

    constructor(apiKey: string, baseUrl: string) {
        this.apiClient = new ApiClient(apiKey, baseUrl)
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

    public async createOrderWithoutAuth({
        cartId, gatewayReference, paymentGatewayProcessor,
        customerPickUp,
        locationId, name, email, phone,
        deliveryAddress, latitude, longitude,
        referralCode, deliveryNotes

    }: {

        cartId: string,
        gatewayReference: string,
        paymentGatewayProcessor: 'FLUTTERWAVE' | 'PAYSTACK',
        name: string,
        email: string,
        phone: string,
        customerPickUp?: boolean,
        deliveryAddress?: string,
        latitude?: number,
        longitude?: number,
        referralCode?: string,
        deliveryNotes?: string,
        locationId?: string
    }): Promise<any> {

        const response = await this.apiClient.POST(`/customer/create_order_and_account`, {
            cartId, gatewayReference, paymentGatewayProcessor,
            customerPickUp,
            locationId, name, email, phone,
            deliveryAddress, latitude, longitude,
            referralCode, deliveryNotes

        });
        if (!response.ok) {
            await this.handleError(response);
        }

        const result = await response.json()
        return result.data;

    }


    public async processContactUsForm(
        data
            : {
                name: string,
                email: string,
                body: string,
                subject: string,
            }
    ): Promise<any> {
        const response = await this.apiClient.POST(`/customer/send_contact_form_email`, {
            ...data
        } as ObjectType);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async processEmailSubscriptionForm(
        email: string): Promise<any> {
        const response = await this.apiClient.POST(`/customer/process_email_subscription`, {
            email
        } as ObjectType);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }

    public async getOrderByCode(orderCode: string): Promise<any> {
        const response = await this.apiClient.GET(`/customer/get_order_from_code?code=${orderCode}`);
        if (!response.ok) {
            await this.handleError(response);
        }
        const result = await response.json()
        return result.data;
    }
}












