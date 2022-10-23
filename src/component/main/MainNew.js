import React from "react";
import SubTitle from "../utils/SubTitle";
import MainNewBookList from "./MainNewBookList";
import useGetBooksInfoNew from "../../api/books/useGetBooksInfoNew";
import "../../css/MainNew.css";

const MainNew = () => {
  const { bookList, Dialog } = useGetBooksInfoNew();

  return (
    <section className="main-new">
      <div className="main-new__wrapper">
        <Dialog />
        <SubTitle
          subTitle="집현전에 새로 들어온 책들을 확인해보세요"
          description="책을 클릭하면 더 자세한 정보를 확인할 수 있습니다."
          alignItems="center"
        />
        <MainNewBookList docs={bookList} />
      </div>
    </section>
  );
};

export default MainNew;
