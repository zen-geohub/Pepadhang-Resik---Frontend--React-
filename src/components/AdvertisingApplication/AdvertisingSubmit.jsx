import ApplicationResult, { ResultContext } from "../Context/ApplicationResult";
import { useContext } from "react";
import Modal from "../Modal";
import { HiArrowLeft } from "react-icons/hi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfVanilla from "./PDF/template/PdfVanilla";
import { SubmitContext } from "./AdvertisingApplication";
import { ModalContext } from "../Sidebar";

function AdvertisingSubmit() {
  const modal = useContext(ModalContext);
  const result = useContext(ResultContext);
  const submit = useContext(SubmitContext);

  function Result({ label, value }) {
    return (
      <tr>
        <td className="font-bold">{label}</td>
        <td>: {value}</td>
      </tr>
    )
  }

  function handleModalClose() {
    modal.setShowModal(false);
  }

  function handleBack() {
    submit.setIsSubmit(!submit.isSubmit);
  }

  return (
    <ApplicationResult>
      <Modal>
        <div className="w-1/2 h-fit bg-white rounded-lg px-2 overflow-auto">
          <header className="sticky top-0 py-2 w-full flex justify-center text-lg font-bold bg-white">
            <button onClick={handleBack} className="absolute top-2 left-0 flex items-center gap-2">
              <HiArrowLeft />
              <span>Kembali</span>
            </button>
            <span>Data Reklame Diajukan</span>
          </header>

          <main>
            <table>
              <tbody>
                <tr className="font-bold">A. <span className="underline">Data Pemohon</span></tr>
                <Result label="Nama Pemohon" value={result.result["Nama Pemohon"]} />
                <Result label="Alamat Pemohon" value={result.result["Alamat Pemohon"]} />
                <Result label="Nomor Telepon/WA" value={result.result["Nomor Telepon/WA"]} />
                {result.result["Nama Perusahaan"] !== "" ? <Result label="Nama Perusahaan" value={result.result["Nama Perusahaan"]} /> : null}
                {result.result["NIB"] !== "" ? <Result label="NIB" value={result.result["NIB"]} /> : null}
                
                <br></br>

                <tr className="font-bold">B. <span className="underline">Keterangan Lokasi</span></tr>
                <Result label="Sudut Simpang" value={result.result["Sudut Simpang"]} />
                <Result label="Koordinat Lintang" value={result.result["Koordinat Lintang"]} />
                <Result label="Koordinat Bujur" value={result.result["Koordinat Bujur"]} />
                <Result label="Kemantren" value={result.result["Kemantren"]} />
                <Result label="Kelurahan" value={result.result["Kelurahan"]} />
                <Result label="Lokasi Reklame" value={result.result["Lokasi Reklame"]} />

                <br></br>

                <tr className="font-bold">C. <span className="underline">Spesifikasi Reklame</span></tr>
                <Result label="Jenis Reklame" value={result.result["Jenis Reklame"]} />
                <Result label="Ukuran Reklame" value={result.result["Ukuran Reklame"]} />
                <Result label="Kategori Persil" value={result.result["Kategori Persil"]} />
                <Result label="Sisi Hadap" value={result.result["Sisi Hadap"]} />
                <Result label="Naskah" value={result.result["Naskah"]} />
                {result.result["Naskah Produk Lainnya"] !== "" ? <Result label="Naskah Produk Lainnya" value={result.result["Naskah Produk Lainnya"]} /> : null}
                <br></br>
                {/* {Object.entries(result.result).map(([key, value]) =>
                  key === "Naskah Produk Lainnya" ? (
                    value !== "" ? (
                      <tr key={key}>
                        <td className="font-bold">{key}</td>
                        <td>: {value}</td>
                      </tr>
                    ) : null
                  ) : (
                    <tr key={key}>
                      <td className="font-bold">{key}</td>
                      <td>: {value}</td>
                    </tr>
                  )
                )} */}
              </tbody>
            </table>

            <button className="w-full p-2 rounded-md bg-sky-600 hover:bg-sky-700 font-bold mb-2" onClick={handleModalClose}>Submit</button>

            <PDFDownloadLink
              document={<PdfVanilla result={result.result} />}
              fileName="KKPR.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : <button className="w-full p-2 rounded-md bg-red-600 hover:bg-red-700 font-bold ">Cetak Formulir</button>
              }
            </PDFDownloadLink>
          </main>

          <footer className="sticky bottom-0 py-2 w-full"></footer>
        </div>
      </Modal>
    </ApplicationResult>
  );
}

export default AdvertisingSubmit;
