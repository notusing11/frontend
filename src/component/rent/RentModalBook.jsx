import React, { useState } from "react";
import PropTypes from "prop-types";
import BookList from "./RentModalBookList";
import SearchModal from "../utils/SearchModal";
import BarcodeReader from "../utils/BarcodeReader";
import useGetBooksSearch from "../../api/books/useGetBooksSearch";
import useGetBooksId from "../../api/books/useGetBooksId";

const RentModalBook = ({ selectedBooks, setSelectedBooks, closeModal }) => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(true);

  const { setBookId, Dialog: ErrorDialog } = useGetBooksId({
    setSelectedBooks,
    closeModal,
  });

  const toDoAfterRead = text => {
    const bookId = text.split(" ")[0];
    setUsingBarcodeReader(false);
    setBookId(bookId);
  };

  const { bookList, lastPage, page, setPage, setQuery, Dialog } =
    useGetBooksSearch({ limit: 3 });

  return (
    <SearchModal
      titleText="도서 정보"
      searchBarPlaceholder="도서의 이름을 입력해주세요."
      page={page}
      setPage={setPage}
      setQuery={setQuery}
      lastPage={lastPage}
      isWithBarcodeButton
      onClickBarcodeButton={() => setUsingBarcodeReader(!isUsingBarcodeReader)}
    >
      {isUsingBarcodeReader && <BarcodeReader toDoAfterRead={toDoAfterRead} />}
      {bookList.map(book => (
        <BookList
          key={book.bookId}
          book={book}
          setSelectedBooks={setSelectedBooks}
          selectedBooks={selectedBooks}
          closeModal={closeModal}
        />
      ))}
      <Dialog />
      <ErrorDialog />
    </SearchModal>
  );
};

export default RentModalBook;

RentModalBook.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
