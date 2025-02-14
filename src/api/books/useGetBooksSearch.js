import { useEffect } from "react";
import useApi from "../../hook/useApi";
import useSearch from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksSearch = ({ limit }) => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();

  const { request, Dialog } = useApi("get", "books/search", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit,
  });

  const expectedItem = [
    { key: "bookId", type: "number", isNullable: false },
    { key: "bookInfoId", type: "number", isNullable: false },
    { key: "status", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "author", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "categoryId", type: "number", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "publisher", type: "string", isNullable: false },
    { key: "publishedAt", type: "string", isNullable: true },
    { key: "callSign", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    { key: "isLendable", type: "number", isNullable: false },
  ];

  const refineResponse = response => {
    const book = compareExpect(
      "books/search",
      response.data.items,
      expectedItem,
    );
    const { totalPages } = response.data.meta;
    setSearchResult({
      list: book,
      lastPage: parseInt(totalPages, 10),
    });
  };

  useEffect(() => {
    request(refineResponse);
  }, [searchParams]);

  return {
    bookList: searchResult.list,
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    Dialog,
  };
};

export default useGetBooksSearch;
