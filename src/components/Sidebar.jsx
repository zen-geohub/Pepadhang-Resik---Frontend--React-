import React, { useState } from "react";
import {
  HiHome,
  HiFilter,
  HiDocumentAdd,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import AdvertisingApplication from "./AdvertisingApplication/AdvertisingApplication";
import Modal from "./Modal";

export const ModalContext = React.createContext();

function Sidebar() {
  const [test, setTest] = useState("");
  const [showModal, setShowModal] = useState(false);

  function testt() {
    console.log(test);
    setTest("test");
  }

  function handleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <aside className="flex flex-col justify-between p-2 bg-primary-color h-screen w-fit text-white">
        <div className="flex flex-col gap-4">
          <button className="btn-sidebar">
            <span>
              <HiHome className="text-2xl" />
            </span>
            <span>Home</span>
          </button>

          <button className="btn-sidebar">
            <span>
              <HiFilter className="text-2xl" />
            </span>
            <span>Filter</span>
          </button>

          <button onClick={handleModal} className="btn-sidebar text-start">
            <span>
              <HiDocumentAdd className="text-2xl" />
            </span>
            <span>
              Permohonan
              <br />
              Reklame
            </span>
          </button>
        </div>

        <button className="btn-sidebar">
          <span>
            <HiQuestionMarkCircle className="text-2xl" />
          </span>
          <span>Panduan</span>
        </button>
      </aside>
      <ModalContext.Provider value={{ showModal, setShowModal }}>
        {showModal && <AdvertisingApplication />}
      </ModalContext.Provider>
    </>
  );
}

export default Sidebar;
