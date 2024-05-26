import { useContext } from "react";
import Modal from "./Modal";
import { ModalContext } from "./Sidebar";
import { HiDownload, HiX, HiEye } from "react-icons/hi";

function Guide() {
  const modal = useContext(ModalContext);

  function handleModalClose() {
    modal.setShowGuide(false);
  }
  return (
    <Modal>
      <div className="w-1/2 h-fit bg-white py-2 px-4 rounded-md flex flex-col gap-2">
        <header className="z-20 py-2 w-full flex justify-center text-xl font-bold bg-white relative">
          <p className="text-3xl">Daftar Panduan</p>
          <button onClick={handleModalClose} className="absolute right-0">
            <HiX />
          </button>
        </header>

        <table className="w-full">
          <tr className="border-b-4 border-black font-bold select-none">
            <td className="w-[40%]">Nama</td>
            <td className="w-[10%] text-center">Ukuran</td>
            <td className="w-[10%] text-center">Aksi</td>
          </tr>
          <tr className="border-sky-50 border hover:bg-sky-100">
            <td className="text-justify select-none">Peraturan Walikota Yogyakarta No. 32 Tahun 2023 tentang Peraturan Pelaksanaan Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame</td>
            <td className="text-center select-none">6.8 Mb</td>
            <td className="flex justify-center py-4 text-xl"><a  href="https://drive.google.com/file/d/1wekPpRCNZju8g4ugmhwhaY5VTqVgK-9N/view?usp=drive_link" target="_blank"><HiEye /></a></td>
          </tr>
          <tr className="border-sky-50 border hover:bg-sky-100">
            <td className="text-justify select-none">Contoh Kesesuaian Kegiatan Pemanfaatan Ruang Reklame</td>
            <td className="text-center select-none">1.4 Mb</td>
            <td className="flex justify-center py-4 text-xl"><a href="https://drive.google.com/file/d/1RRKqTBUSLwd3vt-ghBz4aDmOjjyOHRv9/view?usp=drive_link" target="_blank"><HiEye /></a></td>
          </tr>
          <tr className="border-sky-50 border hover:bg-sky-100">
            <td className="text-justify select-none">Panduan Teknis Penggunaan Aplikasi</td>
            <td className="text-center select-none">3.9 Mb</td>
            <td className="flex justify-center py-4 text-xl"><a href="https://drive.google.com/file/d/1RcdPutyemnfXK5Pha4NntX9yQ1C9rOkF/view?usp=drive_link" target="_blank"><HiEye /></a></td>
          </tr>
        </table>
      </div>
    </Modal>
  )
}

export default Guide;