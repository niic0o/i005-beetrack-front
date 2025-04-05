
export interface Product {
    id: number;
    barcode: string;
    name: string;
    price: number;
    stock: number;
}


export interface StockAlert {
    id: number;
    message: string;
}


export interface SaleItem {
    id: number;
    barcode: string;
    name: string;
    price: number;
}


export interface Sale {
    id: number;
    items: SaleItem[];
    total: number;
    date: string;
}



  
 
export type NewProduct = Omit<Product, 'id'>;