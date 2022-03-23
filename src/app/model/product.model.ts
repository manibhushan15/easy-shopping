export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  rating?: number;
  isAddedToCart: boolean;
  isFav: boolean;

}
