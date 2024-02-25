import { FC } from "react";
import { Product } from "../List/List";
import { Accent, Item, Text } from "./ItemProduct.styled";


export const ItemProduct :FC<Product> = ({id,product,price,brand}) => {
	return <Item>
	<Text>
	  <Accent>Продукт:</Accent> {product}
	</Text>
	<Text>
	  <Accent>Id:</Accent> {id}
	</Text>
	<Text>
	  <Accent>Цена:</Accent> {price}
	</Text>
	<Text>
	  <Accent>Бренд:</Accent> {brand ?? "бренд отсутсвует"}
	</Text>
 </Item>
}