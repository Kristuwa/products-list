import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Button, ButtonsList, Page, PagesList } from "./Pagination.styled";

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}

export const Pagination: FC<Props> = ({
  setCurrentPage,
  currentPage,
  totalPages
}) => {
  
  const listOfPage: () => number[] = () => {
    let arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const handlePageChangeNext = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, [setCurrentPage]);

  const handlePageChangePrev = useCallback(() => {
    setCurrentPage((prevState) => prevState - 1);
  }, [setCurrentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  return (
    <ButtonsList>
      <Button onClick={handlePageChangePrev} disabled={currentPage === 1}>
       Предыдущая
      </Button>
      <PagesList>
        {listOfPage().map((item: number) => (
          <Page
            onClick={() => handlePageChange(item)}
            active={item === currentPage}
            key={item}
          >
            {item}
          </Page>
        ))}
      </PagesList>
      <Button
        onClick={handlePageChangeNext}
        disabled={currentPage === totalPages}
      >
        Следующая
      </Button>
    </ButtonsList>
  );
};
