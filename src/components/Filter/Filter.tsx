import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../Pagination/Pagination.styled";
import { FormContainer, Input, TextForm } from "./Filter.styled";
import { Formik, FormikHelpers } from "formik";
import { formatDate } from "../../helpers";
import axios from "axios";
import md5 from "md5";

interface Props {
  setIds: Dispatch<SetStateAction<string[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

interface Values {
  product?: string;
  price?: number;
  brand?: string;
}

const currentDate = formatDate();

export const Filter: FC<Props> = ({
  setIds,
  setLoading,
  setTotalPages,
  setCurrentPage,
}) => {
  const handleFilter = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    setLoading(true);
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
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const { data } = resultsIds;

      setIds(data.result);
      const totalPage: number = Math.ceil(data.result.length / 50);
      setCurrentPage(1);
      setTotalPages(totalPage);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      setLoading(false);
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
