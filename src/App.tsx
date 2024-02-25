import { FC, useEffect, useState } from "react";
import "./App.css";
import { theme } from "./utils/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { Title } from "./components/List/ListProducts.styled";
import { formatDate } from "./helpers";
import axios from "axios";
import md5 from "md5";
import { Pagination } from "./components/Pagination/Pagination";
import { ListProducts } from "./components/List/ListProducts";
import { Filter } from "./components/Filter/Filter";

export interface Product {
  id: string;
  product: string;
  price: number;
  brand: string;
}

const currentDate = formatDate();

const App: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);

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
  useEffect(() => {
    //уберем товары с повторяющимися id
    const uniqueProds: Product[] = products.reduce(
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
	 setUniqueProducts(uniqueProds);
  }, [products]);

  const currentProducts: Product[] = uniqueProducts.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main className="main-container">
        <Title>Список товаров</Title>
        <div>
          <Filter uniqueProducts={uniqueProducts} setProducts={setProducts} />
        </div>
        <ListProducts products={currentProducts} />
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
      </main>
    </ThemeProvider>
  );
};

export default App;
