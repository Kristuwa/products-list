import axios from "axios";
import React, { useState, useEffect } from "react";
import md5 from "md5";
import { List } from "./List.styled";
import { formatDate } from "../../helpers";
import { ItemProduct } from "../ItemProduct/ItemProduct";
import { Pagination } from "../Pagination/Pagination";

export interface Product {
  id: string;
  product: string;
  price: number;
  brand: string;
}

const currentDate = formatDate();

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    //функция для получения данных с запроса
    const getProducts = async () => {
      try {
        //получим ids необходимого количества товара
        const resultsIds = await axios.post(
          "http://api.valantis.store:40000/",
          {
            action: "get_ids",
            params: { offset: 0, limit: 200 },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth": md5(`Valantis_${currentDate}`),
            },
          }
        );

        const { data } = resultsIds;
        //получим товары для 1х 100 ids
        for (let i = 1; i <= 2; i += 1) {
          const productsList = await axios.post(
            "http://api.valantis.store:40000/",
            {
              action: "get_items",
              params: { ids: data.result.slice(i - 1, 100 * i) },
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Auth": md5(`Valantis_${currentDate}`),
              },
            }
          );

          const dataProducts = productsList.data.result;

          //запишим их в состояние
          setProducts((prevState) => [...prevState, ...dataProducts]);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    };
    getProducts();
  }, []);

  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  //уберем товары с повторяющимися id
  const uniqueProducts: Product[] = products.reduce(
    (acc: Product[], product: Product) => {
      const productIndex: number = acc.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex === -1) {
        acc.push(product);
      }
      return acc;
    },
    []
  );

  const currentProducts: Product[] = uniqueProducts.slice(startIndex, endIndex);

  return (
    <div>
      <List>
        {currentProducts.map(({ product, id, brand, price }) => (
          <ItemProduct
            key={id}
            id={id}
            product={product}
            brand={brand}
            price={price}
          />
        ))}
      </List>
      <div>
        {uniqueProducts.length > itemsPerPage && (
          <Pagination
            products={uniqueProducts}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            endIndex={endIndex}
          />
        )}
      </div>
    </div>
  );
};
