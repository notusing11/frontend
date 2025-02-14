import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const usePatchReservationsCancel = ({
  defaultConfig,
  setConfig,
  setOpen,
  setOpenTitleAndMessage,
}) => {
  const [reservationId, setReservationId] = useState(undefined);
  const { request } = useApi("patch", `reservations/cancel/${reservationId}`);

  const onSuccess = () => {
    setOpenTitleAndMessage("예약 취소가 완료되었습니다.", "", () =>
      window.location.reload(),
    );
  };

  const confirmCancelReservation = () => {
    setConfig({
      ...defaultConfig,
      afterClose: () => setReservationId(undefined),
      title: "예약을 취소하시겠습니까?",
      message: "주의 : 예약취소는 대기순위를 잃고 되돌릴 수 없습니다.",
      firstButton: {
        ...defaultConfig.firstButton,
        onClick: () => {
          request(onSuccess);
        },
      },
    });
    setOpen();
  };

  useEffect(() => {
    if (reservationId) confirmCancelReservation();
  }, [reservationId]);

  return { setReservationId };
};

export default usePatchReservationsCancel;
