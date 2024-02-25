import { FC } from "react";
import { List } from "./ListProducts.styled";
import { ItemProduct } from "../ItemProduct/ItemProduct";
import { Product } from "../../App";

interface Props {
  products: Product[];
}

export const ListProducts: FC<Props> = ({ products }) => {
  return (
    <List>
      {products.map(({ product, id, brand, price }) => (
        <ItemProduct
          key={id}
          id={id}
          product={product}
          brand={brand}
          price={price}
        />
      ))}
    </List>
  );
};
