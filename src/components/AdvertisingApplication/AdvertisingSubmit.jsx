import ApplicationResult, { ResultContext } from "../Context/ApplicationResult";
import { useContext } from "react";
import Modal from "../Modal";
import { HiX } from "react-icons/hi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfVanilla from "./PDF/template/PdfVanilla";

function AdvertisingSubmit() {
  const result = useContext(ResultContext);

  function Result() {
    return (
      <div>
        {Object.entries(result.result).map(([key, value]) => {
          return (
            <div key={key}>
              <span>{key}</span>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <ApplicationResult>
      <Modal>
        <div className="w-1/2 h-5/6 bg-white rounded-lg px-2 overflow-auto">
          <header className="sticky top-0 py-2 w-full flex justify-center text-lg font-bold bg-white">
            <span>Data Reklame Diajukan</span>
            <button className="absolute right-0">
              <HiX />
            </button>
          </header>

          <main>
            <table>
              <tbody>
                {Object.entries(result.result).map(([key, value]) =>
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
                )}
              </tbody>
            </table>

            <PDFDownloadLink
              document={<PdfVanilla result={result.result} />}
              fileName="somename.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
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
