import { Dispatch, FC, SetStateAction } from "react";
import { Product } from "../../App";
import { Button } from "../Pagination/Pagination.styled";
import { FormContainer, Input, TextForm } from "./Filter.styled";
import { Formik, FormikHelpers } from "formik";
import { formatDate } from "../../helpers";
import axios from "axios";
import md5 from "md5";

interface Props {
  uniqueProducts: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

interface Values {
  product?: string;
  price?: number;
  brand?: string;
}

const currentDate = formatDate();

export const Filter: FC<Props> = ({ uniqueProducts, setProducts }) => {
  const handleFilter = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    try {
      //получим ids необходимого количества товара
      const nameValue = Object.keys(values);
      const valueParam = Object.values(values);

      const resultsIds = await axios.post(
        "http://api.valantis.store:40000/",
        {
          action: "filter",
          params: {
            [nameValue[0]]:
              nameValue[0] === "price" ? Number(valueParam[0]) : valueParam[0],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": md5(`Valantis_${currentDate}`),
          },
        }
      );

      const { data } = resultsIds;
      console.log(data);
      for (let i = 0; i < data.result.length; i += 100) {
        const productsList = await axios.post(
          "http://api.valantis.store:40000/",
          {
            action: "get_items",
            params: { ids: data.result.slice(i, i + 100) },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth": md5(`Valantis_${currentDate}`),
            },
          }
        );
        const dataProducts = productsList.data.result;
        if (i === 0) {
          setProducts(dataProducts);
        } else {
          setProducts((prevState) => [...prevState, ...dataProducts]);
        }
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }

    resetForm();
  };

  const value = (name: string) =>
    name === "Наименование" ? "product" : name === "Цена" ? "price" : "brand";

  return (
    <>
      <TextForm>Введите параметр в необходимое поле фильтра </TextForm>
      {["Наименование", "Цена", "Бренд"].map((name) => (
        <Formik
          key={name}
          initialValues={{
            [value(name)]: "",
          }}
          onSubmit={handleFilter}
        >
          <FormContainer>
            <Input
              id={name}
              name={value(name)}
              type="text"
              placeholder={name}
            />
            <Button type="submit">Filter</Button>
          </FormContainer>
        </Formik>
      ))}
    </>
  );
};
