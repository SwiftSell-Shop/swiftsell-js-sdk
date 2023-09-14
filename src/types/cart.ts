export interface Addons {
    addonId: string;
    quantity: number;
}

export interface AddtoCartProps {
    product_id: string;
    quantity: number;
    cart_id?: string;
    productOptionContentName?: string;
    addons?: Addons[]
}



export interface ICartItemInput {
    productId: string;
    quantity: number;
    productOptionContentName?: string;
    productOptionContentAmount?: number;
    addons?: Addons[];
}

export interface ICartData {
    cartId?: string;
    data: ICartItemInput[];
    createdAt?: Date;
    updatedAt?: Date;
    vat?: number;
    deliveryFee?: number;
    totalPayable?: number;
    itemTotalAmount?: number;
    vatPercentage?: number;
    deliveryAddress?: string;
    latitude?: number;
    longitude?: number;
    deliveryNotes?: string;
}

export interface ICreateOrderWithoutAccountProps {
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
}

export interface ISwiftSellSDK {
    getProducts: (page: number,
        perPage: number,
        searchQuery: string,
        filterByCategories: string) => Promise<any>;
    getSingleProduct: (productId: string) => Promise<any>;
    getSiteConfig: () => Promise<any>;

    addToCart: (productId: string,
        quantity: number,
        cartId?: string,
        productOptionContentName?: string,
        addons?: Addons[]) => Promise<ICartData>;
    removeFromCart: (productId: string,
        cartId: string) => Promise<ICartData>;
    createOrderWithoutAuth: (data: ICreateOrderWithoutAccountProps) => void;
    getCartItems: (cartId: string) => Promise<ICartData>;

    login?: () => void;
    register?: () => void;
    logout?: () => void;
}
