import React, { useState, useEffect } from "react";
// import ItemMenu from '../component/LandingPage/ItemMenu'
// import Navbar from '../component/LandingPage/Navbar'
// import SitaruLaptop from '../images/sitaru_laptop.png'
import { AiOutlineClockCircle, AiOutlineQuestion } from "react-icons/ai";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
// import Footer from '../component/Footer'
// import Layanan from '../component/Layanan'
import logoYogya from "../assets/images/Logo_Kota_Yogyakarta.7e10e58cc5c567f49755.png";
import logoPepadhang from "../assets/images/LogoPepadhang.png";
// import logoGatraMatra from "../images/logo_gatra.png"

// import React from 'react'
// import {AiOutlineQuestion} from 'react-icons/ai'
// import { useNavigate } from 'react-router-dom'
// import Swal from "sweetalert2"

function Navbar() {
  const [stickyClass, setStickyClass] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      var windowHeight = window.scrollY;
      windowHeight > 0 ? setStickyClass(true) : setStickyClass(false);
    }
  };

  const NavbarItem = ({ menu }) => {
    return (
      <div className="px-3 cursor-pointer font-semibold hover:text-sky-600">
        {menu}
      </div>
    );
  };

  return (
    <div
      className="fixed z-[12] top-0  w-screen  p-2 flex items-center justify-center h-[80px] duration-300"
      style={stickyClass ? { backgroundColor: "white" } : {}}
    >
      <div className="md:left-10 absolute flex items-center">
        <img
          src={logoYogya}
          className="md:w-10 md:h-15 h-12"
          alt="logo kota yogyakarta"
        />
        <div
          className="ml-3  text-xs transform duration-300"
          style={stickyClass ? { color: "black" } : { color: "white" }}
        >
          <div className="font-semibold">DINAS PERTANAHAN DAN TATA RUANG</div>
          <div className="italic">(KUNDHA NITI MANDALA SARTA TATA SASANA)</div>
          <div>KOTA YOGYAKARTA</div>
        </div>
      </div>
      <div className="flex">
        {/* <NavbarItem menu={"Home"}/>
          <NavbarItem menu={"Fitur"}/> */}
      </div>
      <div></div>
    </div>
  );
}

function ItemMenu({
  icon,
  judul,
  keterangan = "Belum diisi",
  active = false,
  link = "/",
  customAction = false,
}) {
  const navigate = useNavigate();

  const movePage = () => {
    if (active) {
      navigate(link);
    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Maaf',
      //   text: `Fitur ${judul} masih dalam tahap pengembangan`,
      // })
    }
  };

  return (
    <div className="bg-white p-2 flex flex-col items-center">
      <div className="z-10 w-[80px] h-[80px] flex justify-center items-center bg-sky-200 m-2 rounded-md">
        {active ? icon : <AiOutlineQuestion size={35} />}
      </div>

      <div
        className="text-center cursor-pointer w-64 border-2 rounded-xl mt-[-40px] pt-[40px] pb-5 border-gray-200 p-2 hover:shadow-lg hover:shadow-gray-300"
        onClick={() => {
          if (customAction) {
            customAction();
          } else {
            movePage();
          }
        }}
      >
        <div
          className="font-bold text-sky-700 text-lg"
          style={active ? {} : { color: "rgb(220 38 38)" }}
        >
          {judul}
        </div>
        <div className="text-sm mt-4 text-gray-500 font-medium">
          {keterangan}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  // const [jumlahPengunjung, setJumlahPengunjung] = useState(0)
  // const [openRating, setOpenRating] = useState(false)

  // const [cookies, setCookie, removeCookie] = useCookies(['akses']);

  // useEffect(() => {
  //   const survey = cookies["akses"]
  //   if(survey){
  //     const url = configData.SERVER_API + "jumlahakses"
  //     fetch(url,{
  //       method:"GET",
  //       credentials: 'same-origin',
  //     }).then(res=>res.json()).then(res=>{
  //       setJumlahPengunjung(res)
  //     }).catch((err)=>{
  //       console.log(err)
  //     })
  //   }else{
  //     const url = configData.SERVER_API + "jumlahakses"
  //     fetch(url,{
  //       method:"PATCH",
  //       credentials: 'same-origin',
  //     }).then(res=>res.json()).then(res=>{
  //       setJumlahPengunjung(res)
  //     }).catch((err)=>{
  //       console.log(err)
  //     })
  //     setCookie("akses",true,{secure:true,httpOnly:true})
  //   }

  // }, [])

  return (
    <div className="flex flex-col">
      <div className=" bg-black py-10 px-20 text-white text-sm mt-5 flex flex-col">
        <div className="w-full relative flex flex-col">
          <div className="grid lg:grid-cols-10">
            <div className="text-center col-span-4 flex flex-col items-center lg:items-start ">
              <img
                src={logoYogya}
                className="w-12 mb-5"
                alt="logo kota yogyakarta"
              />
              <p className="font-semibold">
                Dinas Pertanahan dan Tata Ruang Kota Yogyakarta
              </p>
              <p className="italic">(Kundha Niti Mandala Sarta Tata Sasana)</p>
              <p>Komplek Balaikota Yogyakarta, Kota Yogyakarta</p>
              <p>Jl. Kenari No 56, Mujamuju, Umbulharjo, Yogyakarta 55165</p>
              <p>Telp. (0274) 515865, 562682</p>
              <p>WA pelayanan : 08112735100</p>
              <p>Email : dinpertaru@jogjakota.go.id</p>
              <p>pertanahan.tataruang@gmail.com</p>
              <p>Email pelayanan : online.dinpertaru@gmail.com</p>
            </div>
            <div className="col-span-5">
              <div className="font-semibold   text-xl mt-5 lg:mt-0">
                {" "}
                Apa itu Pepadhang Resik Jogja?
              </div>
              <div className="mt-2 text-justify text-sm">
                Pepadhang Resik Jogja adalah media informasi yang utuh dan mudah
                diakses oleh masyarakat terkait ketentuan penyelenggaraan
                reklame berdasarkan Peraturan Daerah Kota Yogyakarta Nomor 6
                Tahun 2022 tentang Reklame yang kemudian dijabarkan secara lebih
                teknis dan terperinci dalam Peraturan Walikota Yogyakarta Nomor
                32 Tahun 2023 tentang Peraturan Pelaksanaan Peraturan Daerah
                Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame.
              </div>
            </div>
          </div>
          {/* <div className='static right-0 top-0 mt-5 lg:absolute'>
                <div  className=' bg-white text-slate-900 px-4 py-1 font-medium rounded-sm mb-2 text-center cursor-pointer'
                    onClick={()=>setOpenRating(true)}
                >
                    Survey Kepuasan
                </div>
                <div className=' bg-white text-slate-900 px-4 py-1 rounded-t-md  text-center'>
                    Jumlah Kunjungan
                </div>
                <div className='text-center py-2  border-2 border-solid'>
                    {jumlahPengunjung}
                </div>
            </div> */}
        </div>
        {/* {openRating && <SurveyKepuasan setOpenRating={setOpenRating}/>} */}
      </div>
      <div className="bg-gray-900 text-white text-sm px-20 py-3">
        Pepadhang Resik versi Beta © 2024
      </div>
    </div>
  );
}

// export default ItemMenu

function LandingPage() {
  return (
    <div className="">
      <Navbar />
      <div className="h-[calc(100vh_-_72px)] mt-[71px] p-3 md:pl-10 md:flex ">
        <img
          className="absolute z-[-1] left-0 top-0"
          src="https://wallpaperaccess.com/full/1129027.jpg"
          style={{ width: "100vw", backgroundSize: "cover", height: "100vh" }}
          alt="background"
        />
        <div className="w-3/5 flex flex-col h-full justify-center">
          <div className='text-[30px] md:text-[50px] font-bold text-white'>
            PEPADHANG RESIK JOGJA
          </div>
          
          <div className="text-sm md:text-md md:text-xl text-yellow-600 mt-[-15px] text-justify font-semibold">
            (Pengendalian Pemanfaatan Ruang Reklame Berbasis Sistem Informasi Kota Yogyakarta)
            
            {/* (PENGENDALIAN PEMANFAATAN RUANG REKLAME BERBASIS SISTEM INFORMASI
            KOTA YOGYAKARTA) */}
          </div>
          <div className="text-sm md:text-md mt-3 text-white text-justify">
            Media informasi yang utuh dan mudah diakses oleh masyarakat terkait
            ketentuan penyelenggaraan reklame berdasarkan Peraturan Walikota
            Yogyakarta Nomor 32 Tahun 2023 tentang Peraturan Pelaksanaan
            Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame.
          </div>
          <div className="flex mt-5">
            <LinkTo to={"dashboard"}>
              <div className="bg-white py-3 px-6  text-black font-medium rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
                Masuk
              </div>
            </LinkTo>

            <Link
              activeClass="active"
              to="fitur"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              <div className="bg-white py-3 px-6 ml-4 text-black font-medium rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
                Daftar Fitur
              </div>
            </Link>
          </div>
        </div>
        <div className="w-2/5 flex items-center justify-center">
          <img
            src={logoPepadhang}
            className="h-[368.7px] w-[424.8px]"
            // className="h-[245.8px] w-[283.2px] bg-cover mb-5"
            alt="logo pepadhang"
          />
        </div>
        {/* <div className='flex justify-center items-center w-2/5'>
          <img src={SitaruLaptop} className="md:w-[300px] w-0  md:h-[170px]" alt='gatra matra laptop'/>
        </div> */}
      </div>
      <div className="mt-10  z-[100000]">
        <div className="flex justify-center text-2xl font-bold" id="fitur">
          Daftar Fitur
        </div>
        <div className="mt-7 flex justify-center gap-4 md:grid-cols-3 lg:grid-cols-4">
          <ItemMenu
            judul={"Coming soon!"}
            keterangan={""}
            link="/"
            active={true}
            icon={<AiOutlineClockCircle size={50} />}
          />

          {/* <ItemMenu judul={"Peta"} 
            keterangan={"Peta Tematik Tata Ruang"}
            link="/peta"
            active={true}
            icon={<BiMapAlt size={50}/>}
          />

          <ItemMenu judul={"Regulasi"} 
            keterangan={"Informasi Regulasi Tata Ruang"}
            link="/regulasi"
            active={true}
            icon={<AiOutlineSetting size={50}/>}
          />
          
          <ItemMenu judul={"Layanan"} 
            keterangan={"Akses layanan IKTR dan KKPR"}
            customAction={()=>{setLayananOpen(true)}}
            active={true}
            icon={<GrDocumentText size={50}/>}
          />

          <ItemMenu judul={"Hubungi Kami"} 
            keterangan={"Konsultasi dan Aduan"}
            customAction={()=>{window.open("https://api.whatsapp.com/send/?phone=%2B628112735100&text&type=phone_number&app_absent=0", '_blank', 'noopener,noreferrer');}}
            active={true}
            icon={<AiOutlineWhatsApp size={50}/>}
          /> */}
        </div>
        <Footer />
      </div>
      {/* {layananOpen && <Layanan setLayananOpen={setLayananOpen}/>} */}
    </div>
  );
}

export default LandingPage;
