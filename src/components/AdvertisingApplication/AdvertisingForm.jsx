import React, { useContext } from "react";
import DataPemohon from "./FormData/DataPemohon";
import KeteranganLokasi from "./FormData/KeteranganLokasi";
import SpesifikasiReklame from "./FormData/SpesifikasiReklame";
import Modal from "../Modal";
import { HiX } from "react-icons/hi";
import { ModalContext } from "../Sidebar";
import { SubmitContext } from "./AdvertisingApplication";
import DokumenPersyaratan from "./FormData/DokumenPersyaratan";
import { PDFViewer } from "@react-pdf/renderer";
import PdfVanilla from "./PDF/template/PdfVanilla";
import { ResultContext } from "../Context/ApplicationResult";

export function SelectOption({ option, callback }) {
  return (
    <div>
      <label htmlFor={option.default}>{option.default}</label>
      <select
        id={option.default}
        className="form-input"
        onChange={callback ? callback : null}
        required
      >
        {Object.entries(option).map(([key, value]) => {
          return key === "default" ? (
            <option defaultValue={""} key={key} hidden></option>
          ) : (
            <option key={key} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function AdvertisingForm() {
  const modal = useContext(ModalContext);
  const submit = useContext(SubmitContext);
  const result = useContext(ResultContext)

  function handleModalClose() {
    modal.setShowModalApplication(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit.setIsSubmit(!submit.isSubmit);
  }

  return (
    <Modal>
      <div className="w-1/2 min-h-fit max-h-[500px] bg-white rounded-lg px-2 overflow-auto">
        <header className="sticky top-0 z-20 py-2 w-full flex justify-center text-lg font-bold bg-white">
          <span>Formulir Permohonan Reklame</span>
          <button onClick={handleModalClose} className="absolute right-0">
            <HiX />
          </button>
        </header>

        <form className="h-[400px] overflow-auto" onSubmit={handleSubmit}>
          <DataPemohon />
          <KeteranganLokasi />
          <SpesifikasiReklame />
          <DokumenPersyaratan />

          <button
            type="submit"
            className="w-full p-2 rounded-md bg-sky-600 hover:bg-sky-700 font-bold "
          >
            Simpan
          </button>
        </form>

        <footer className="sticky bottom-0 py-2 w-full"></footer>
      </div>

      {/* <PDFViewer className="w-full h-full">
        <PdfVanilla result={result.result} />
      </PDFViewer> */}
    </Modal>
  );
}

export default AdvertisingForm;
