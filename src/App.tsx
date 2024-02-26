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
import { Loader } from "./components/Loader/Loader";

export interface Product {
  id: string;
  product: string;
  price: number;
  brand: string;
}

const currentDate = formatDate();

const App: FC = () => {
  const [ids, setIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //функция для получения данных с запроса
    const getProducts = async () => {
      setLoading(true);
      try {
        //получим ids необходимого количества товара
        const resultsIds = await axios.post(
          "//api.valantis.store:40000/",
          {
            action: "get_ids",
            params: { offset: 0 },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth": md5(`Valantis_${currentDate}`),
            },
          }
        );

        const { data } = resultsIds;
        setIds(data.result);
        const totalPage: number = Math.ceil(data.result.length / 50);

        setTotalPages(totalPage);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        setLoading(false);
      }
    };
    if (ids.length === 0) {
      getProducts();
    }
  }, [ids]);

  useEffect(() => {
    const getProductsPerPage = async () => {
      setLoading(true);

      try {
        const currentIds = ids.slice(50 * (currentPage - 1), 50 * currentPage);
        const productsList = await axios.post(
          "//api.valantis.store:40000/",
          {
            action: "get_items",
            params: { ids: currentIds },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth": md5(`Valantis_${currentDate}`),
            },
          }
        );

        const dataProducts = productsList.data.result;

        const uniqueProds: Product[] = dataProducts.reduce(
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
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при выполнении запроса на 1 страницу:", error);
        setLoading(false);
		  getProductsPerPage();
      }
    };
if(ids.length > 0) {
	getProductsPerPage();
}
    
  }, [currentPage, ids]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main className="main-container">
        <Title>Список товаров</Title>
        <div>
          <Filter
            setIds={setIds}
            setLoading={setLoading}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {ids.length > 0 && !loading && (
          <>
            <ListProducts products={uniqueProducts} />
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
        {loading && <Loader />}
        <div></div>
      </main>
    </ThemeProvider>
  );
};

export default App;
