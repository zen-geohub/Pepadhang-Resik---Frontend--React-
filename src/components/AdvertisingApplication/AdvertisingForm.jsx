import React, { useContext, useState } from "react";
import DataPemohon from "./DataPemohon";
import KeteranganLokasi from "./KeteranganLokasi";
import SpesifikasiReklame from "./SpesifikasiReklame";
import Modal from "../Modal";
import { HiX } from "react-icons/hi";
import { ModalContext } from "../Sidebar";
import { ResultContext } from "../Context/ApplicationResult";
import { SubmitContext } from "./AdvertisingApplication";
import { PDFViewer } from "@react-pdf/renderer";
import PdfVanilla from "./PDF/template/PdfVanilla";
import DokumenPersyaratan from "./DokumenPersyaratan";

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
  const result = useContext(ResultContext);
  const submit = useContext(SubmitContext);

  function handleModalClose() {
    modal.setShowModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit.setIsSubmit(!submit.isSubmit);
  }

  return (
    <Modal>
      <div className="w-1/2 h-5/6 bg-white rounded-lg px-2 overflow-auto">
        <header className="sticky top-0 z-20 py-2 w-full flex justify-center text-lg font-bold bg-white">
          <span>Formulir Permohonan Reklame</span>
          <button onClick={handleModalClose} className="absolute right-0">
            <HiX />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
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

      <PDFViewer className="w-full h-full">
        <PdfVanilla result={result.result} />
      </PDFViewer>
    </Modal>
  );
}

export default AdvertisingForm;
