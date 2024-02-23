import axios from "axios";
import React, { useState, useEffect } from "react";
import md5 from "md5";
import { Accent, Item, List, Text } from "./List.styled";

interface Product {
  id: string;
  product: string;
  price: number;
  brand: string;
}

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
              "X-Auth": md5("Valantis_20240223"),
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
                "X-Auth": md5("Valantis_20240223"),
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  //уберем товары с повторяющимися id
  const uniqueProducts = products.reduce((acc: Product[], product: Product) => {
    const productIndex = acc.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      acc.push(product);
    }
    return acc;
  }, []);

  const currentProducts = uniqueProducts.slice(startIndex, endIndex);

  return (
    <div>
      <List>
        {currentProducts.map(({product, id, brand, price}) => (
          <Item key={id}>
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
        ))}
      </List>
      <div>
        {products.length > itemsPerPage && (
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= products.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
