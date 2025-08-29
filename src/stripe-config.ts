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
    priceId: 'price_1S1PfDEk4co9sYTKVNobZjOF',
    name: 'Ghost Recovery Guide',
    description: '✓Complete 127-Page System✓ 15-Question Ghost Type Identifier Quiz✓ 72-Hour Recovery Timeline (Hour-by-Hour)✓ 23 Copy-Paste Message Templates (67% Success)✓ 4 Bonus Guides Worth $158 (FREE)Instant Download',
    mode: 'payment',
    price: 0.50
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};