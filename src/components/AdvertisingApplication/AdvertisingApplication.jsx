import DataPemohon, { dataPemohon } from "./DataPemohon";
import KeteranganLokasi from "./KeteranganLokasi";
import SpesifikasiReklame from "./SpesifikasiReklame";
import Modal from "../Modal";

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

function AdvertisingApplication() {

  return (
    <Modal>
      <form className="w-1/2 h-5/6 bg-white rounded-lg px-2 overflow-auto">
        <header className="sticky top-0 py-2 w-full flex justify-center text-lg font-bold bg-white">
          Formulir Permohonan Reklame
        </header>

        <DataPemohon />
        <KeteranganLokasi />
        <SpesifikasiReklame />
        <input type="file" name="" id="" />

        <div className="w-full flex justify-end mt-4 gap-2">
          <button className="bg-sky-500">Submit</button>
          <button>Print</button>
        </div>
        <footer className="sticky bottom-0 py-2 w-full"></footer>
      </form>
    </Modal>
  );
}

export default AdvertisingApplication;
