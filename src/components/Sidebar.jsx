import React, { useContext, useState } from "react";
import {
  HiHome,
  HiFilter,
  HiDocumentAdd,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import AdvertisingApplication from "./AdvertisingApplication/AdvertisingApplication";
import { mapContext } from "./Context/MapContext";
import Guide from "./Guide";
import { Link } from "react-router-dom";

export const ModalContext = React.createContext();

function Sidebar() {
  const filter = useContext(mapContext)
  const [showGuide, setShowGuide] = useState(false);
  const [showModalApplication, setShowModalApplication] = useState(false);

  function handleFilterClick() {
    filter.setShowFilter(!filter.showFilter);
  }

  function handleGuideClick() {
    setShowGuide(!showGuide);
  }

  function handleModal() {
    setShowModalApplication(!showModalApplication);
  }

  return (
    <>
      <aside className="flex flex-col justify-between z-20 p-2 bg-primary-color h-screen w-fit text-white">
        <div className="flex flex-col gap-4">
          {/* <a href="https://gatramatra.jogjakota.go.id/" className="btn-sidebar">
            <span>
              <HiHome className="text-2xl" />
            </span>
            <span>Beranda</span>
          </a> */}
          <Link to="/" className="btn-sidebar">
            <span>
              <HiHome className="text-2xl" />
            </span>
            <span>Beranda</span>
          </Link>

          <button onClick={handleFilterClick} className={filter.showFilter ? "btn-sidebar-active" : "btn-sidebar"}>
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

        <button onClick={handleGuideClick} className="btn-sidebar">
          <span>
            <HiQuestionMarkCircle className="text-2xl" />
          </span>
          <span>Panduan</span>
        </button>
      </aside>
      <ModalContext.Provider value={{ showModalApplication, setShowModalApplication, showGuide, setShowGuide }}>
        {showModalApplication && <AdvertisingApplication />}
        {/* <AdvertisingApplication /> */}
        {showGuide && <Guide />}
      </ModalContext.Provider>
    </>
  );
}

export default Sidebar;
