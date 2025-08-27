export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
}

export const products: Product[] = [
  {
    id: 'prod_SwCIyU94gSAJOS',
    priceId: 'price_1S0Ju5Ek4co9sYTKV8rK8kbN',
    name: 'Ghost Recovery Guide',
    description: 'Der Guide',
    mode: 'payment',
    price: 99.00
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};