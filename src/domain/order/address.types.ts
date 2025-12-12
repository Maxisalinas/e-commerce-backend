export interface ShippingAddress {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone?: string;
}

export interface BillingAddress {
    name: string;
    street: string;
    city: string;
    state: string;      
    zip: string;    // código postal.
    country: string;
}