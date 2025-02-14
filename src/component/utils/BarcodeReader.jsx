import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import PropTypes from "prop-types";
import "../../css/BarcodeReader.css";

const BarcodeReader = ({ toDoAfterRead, wrapperClassName }) => {
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(deviceList[0]?.deviceId);
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    codeReader
      .listVideoInputDevices()
      .then(videoInputDevices => {
        setDeviceList(videoInputDevices);
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  useEffect(() => {
    codeReader.decodeFromVideoDevice(
      selectedDevice,
      videoRef.current,
      result => {
        if (result) {
          toDoAfterRead(result.text);
        }
      },
    );
  }, [selectedDevice]);

  const onChangeSelect = e => {
    setSelectedDevice(e.currentTarget.value);
  };

  return (
    <div className={`barcode-reader__wrapper ${wrapperClassName || ""}`}>
      <video id="video" ref={videoRef} muted />
      <select
        id="sourceSelect"
        onChange={onChangeSelect}
        value={selectedDevice}
      >
        {deviceList.map(device => {
          return (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default BarcodeReader;

BarcodeReader.propTypes = {
  wrapperClassName: PropTypes.string,
  toDoAfterRead: PropTypes.func.isRequired,
};

BarcodeReader.defaultProps = {
  wrapperClassName: "",
};
