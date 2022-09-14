import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Banner from "../utils/Banner";
import "../../css/ReservedLoan.css";
import Pagination from "../utils/Pagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import Reserve from "../../img/list-check-solid.svg";
import ReservedFilter from "./ReservedFilter";
import ReservedTableList from "./ReservedTableList";
import ReservedModal from "./ReservedModal";
import Tabs from "../utils/Tabs";
import { rentTabList } from "../../data/tablist";

const ReservedLoan = () => {
  const [modal, setModal] = useState(false);
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [resevedLoanPage, setResevedLoanPage] = useState(1);
  const [resevedLoanPageRange, setResevedLoanPageRange] = useState(0);
  const [lastresevedLoanPage, setLastresevedLoanPage] = useState(1);
  const [reservedLoanList, setReservedLoanList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [reservedInfo, setReservedInfo] = useState(null);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleReservedLoanSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setResevedLoanPage(1);
    setResevedLoanPageRange(0);
  };

  const filterState = () => {
    if (isPending) return "pending";
    if (isWaiting) return "waiting";
    if (isExpired) return "expired";
    return "all";
  };

  const fetchReservedLoanData = async () => {
    const {
      data: { items, meta },
    } = await axios.get(`${process.env.REACT_APP_API}/reservations/search`, {
      params: {
        query: userSearchWord,
        page: resevedLoanPage - 1,
        limit: 5,
        filter: filterState(),
      },
    });
    setReservedLoanList(items);
    setLastresevedLoanPage(meta.totalPages);
  };

  useEffect(async () => {
    setResevedLoanPage(1);
    await fetchReservedLoanData();
  }, [userSearchWord]);

  useEffect(() => {
    setUserSearchWord("");
  }, []);

  useEffect(fetchReservedLoanData, [
    resevedLoanPage,
    isPending,
    isWaiting,
    isExpired,
  ]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handleReservedLoanSumbit);
    return () =>
      searchForm.removeEventListener("submit", handleReservedLoanSumbit);
  }, [handleReservedLoanSumbit]);

  useEffect(() => {
    setResevedLoanPage(1);
    setResevedLoanPageRange(0);
    setResevedLoanPageRange(0);
  }, [isPending, isWaiting, isExpired]);

  return (
    <main>
      <Banner img="admin" titleKo="예약 대출" titleEn="BOOK RESERVATION" />
      <Tabs tabList={rentTabList} />
      <section className="reserved-loan-body">
        <div className="inquire-box-wrapper">
          <InquireBoxTitle
            Icon={Reserve}
            titleKO="예약 정보"
            titleEN="Reservation info"
            placeHolder="예약 대출자의 성명 혹은 도서명을 입력해주세요."
          />
        </div>
        <div className="reserved-loan-table__inquire-box">
          <div className="reserved-loan-filter">
            <ReservedFilter
              isPending={isPending}
              setIsPending={setIsPending}
              isExpired={isExpired}
              setIsExpired={setIsExpired}
              isWaiting={isWaiting}
              setIsWaiting={setIsWaiting}
            />
          </div>
          {reservedLoanList.map(factor => (
            <ReservedTableList
              key={factor.id}
              isPending={isPending}
              isWaiting={isWaiting}
              isExpired={isExpired}
              isAll={!(isPending || isWaiting || isExpired)}
              factor={factor}
              openModal={openModal}
              setInfo={setReservedInfo}
            />
          ))}
          <div className="reserved-loan-table__pagination">
            <Pagination
              userPage={resevedLoanPage}
              setUserPage={setResevedLoanPage}
              pageRange={resevedLoanPageRange}
              setPageRange={setResevedLoanPageRange}
              lastPage={lastresevedLoanPage}
            />
          </div>
        </div>
      </section>
      {modal && (
        <ReservedModal reservedInfo={reservedInfo} closeModal={closeModal} />
      )}
    </main>
  );
};

export default ReservedLoan;
