import React from "react";
import "../../css/MypageRentedBook.css";
import PropTypes from "prop-types";

const MypageRentedBook = ({ rentInfoArr }) => {
  return (
    <div className="mypage-rented__book">
      {rentInfoArr &&
        rentInfoArr.map(rentInfo => (
          <div className="mypage-rented__book-wrapper">
            <img
              className="mypage-rented__book-image"
              src={rentInfo.image}
              alt={rentInfo.image}
            />
            <div className="mypage-rented__book-info">
              <div className="mypage-rented__book-info-titleBox">
                <div className="mypage-rented__book-info-title font-18-bold color-2d">
                  {rentInfo.title && rentInfo.title.length < 22
                    ? rentInfo.title
                    : null}
                  {rentInfo.title && rentInfo.title.length >= 22
                    ? rentInfo.title.slice(0, 22).concat("...")
                    : null}
                </div>
                <div className="mypage-rented__book-info-writter font-14">
                  {rentInfo.author && rentInfo.author.length < 14
                    ? rentInfo.author
                    : null}
                  {rentInfo.author && rentInfo.author.length >= 14
                    ? rentInfo.author.slice(0, 14).concat("...")
                    : null}
                </div>
              </div>
              <div className="mypage-rented__book-info-rent font-14">
                <div>대출일시</div>
                <div>
                  {rentInfo.lendDate ? rentInfo.lendDate.slice(0, 10) : "-"}
                </div>
                <div>반납기한</div>
                <div>
                  {rentInfo.duedate ? rentInfo.duedate.slice(0, 10) : "-"}
                </div>
                <div>연체일</div>
                <div>
                  {rentInfo.overDueDay ? `${rentInfo.overDueDay}일` : "-"}
                </div>
                <div>비고</div>
                <div>
                  {rentInfo.lendingCondition ? rentInfo.lendingCondition : "-"}
                </div>
              </div>
              <div className="mypage-rented__book-info-reserve font-14">
                <div>예약</div>
                <div>
                  {rentInfo.reservedNum ? `${rentInfo.reservedNum}명` : "-"}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

MypageRentedBook.propTypes = {
  rentInfoArr: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default MypageRentedBook;
