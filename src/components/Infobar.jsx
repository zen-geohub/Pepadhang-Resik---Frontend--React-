import { IoIosArrowForward } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
// import { MapContext } from "./Map";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import LogoKotaYogyakarta from "../assets/images/Logo_Kota_Yogyakarta.7e10e58cc5c567f49755.png";
import { mapContext } from "./Context/MapContext";

function AgencyContent() {
  return (
    <div className="w-full h-full flex-col items-center justify-center gap-2 flex">
      <img src={LogoKotaYogyakarta} className="h-[100px]" alt="" />

      <h2 className="font-bold text-xl">Pepadhang Resik Jogja</h2>

      <div className="w-full h-[2px] bg-black"></div>

      <h4 className="font-semibold text-center text-sm">
        Dinas Pertanahan dan Tata Ruang
        <br />
        Kota Yogyakarta
      </h4>

      <article className="text-center text-sm">
        <p>Jln. Kenari No.56, Muja Muju, Umbulharjo, Kota Yogyakarta,</p>
        <p>Daerah Istimewa Yogyakarta 55165</p>
        <p>Telp. 0274515865, 0274515866</p>
        <p>No. WA Layanan Online : 0811-2735-100</p>
        <p>Email : pertanahantataruang@jogjakota.go.id</p>
      </article>
    </div>
  );
}

export function AdvertisingContent() {
  const data = useContext(mapContext);

  const normal = "w-full h-fit p-2 rounded-lg border-[1px] border-[#7a7a7a] ";
  const violating = "w-full h-fit p-2 rounded-lg border-[1px] border-[#7a7a7a] bg-[#e57373]";
  const notViolating = "w-full h-fit p-2 rounded-lg border-[1px] border-[#7a7a7a] bg-[#81c784]";

  function Content({ head, content, style }) {

    return (
      <div className={style}>
        <p>
          <strong>{head}</strong>
        </p>
        <p>{content}</p>
      </div>
    );
  }
  // value !== "" ? value.includes('Tidak') || value.includes('Bukan') ? notViolating : violating : normal

  return (
    <>
      <h1 className="font-bold text-xl">Informasi Reklame</h1>

      {Object.entries(data.identitasReklame).map(([key, value]) => {
        return <Content style={normal} key={key} head={key} content={value} />;
      })}
      {Object.entries(data.pelanggaranReklame).map(([key, value]) => {
        return <Content style={value !== undefined ? value.includes('Tidak') || value.includes('Bukan') ? notViolating : violating : normal} key={key} head={key} content={value} />;
      })}
      {Object.entries(data.tindakan).map(([key, value]) => {
        return <Content style={normal} key={key} head={key} content={value} />;
      })}
    </>
  );
}

function Infobar() {
  const pointState = useContext(mapContext);

  const [isOpen, setIsOpen] = useState(true);

  function toggleInfobar() {
    setIsOpen(!isOpen);
  }

  const infobarClass = isOpen
    ? "absolute right-0 top-0 h-screen w-fit flex items-center translate-x-0 transition-transform duration-300"
    : "absolute right-0 top-0 h-screen w-fit flex items-center translate-x-[320px] transition-transform duration-300";

  const buttonClass = isOpen
    ? "transition-transform rotate-0 duration-300"
    : "transition-transform rotate-180 duration-300";

  return (
    <div className={infobarClass}>
      <button
        onClick={toggleInfobar}
        className="py-6 px-2 rounded-l-md bg-white text-black h-fit "
      >
        <IoIosArrowForward className={buttonClass} />
      </button>
      <div className="bg-white h-full w-[320px] rounded-l-md p-2 flex flex-col items-center gap-4 overflow-auto">
        {pointState.reklameIsClicked ? <AdvertisingContent /> : <AgencyContent />}
        {/* <AgencyContent /> */}
        {/* <AdvertisingContent /> */}
      </div>
    </div>
  );
}

export default Infobar;
