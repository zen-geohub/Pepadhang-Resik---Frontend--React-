import { useContext, useEffect, useState } from "react";
import { ResultContext } from "../Context/ApplicationResult";

function DataPemohon() {
  const [nama, setNama] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [NIB, setNIB] = useState("");
  const [telephoneNum, setTelephoneNum] = useState("");

  const result = useContext(ResultContext);

  useEffect(() => {
    result.setResult({
      'Nama Pemohon': nama,
      'Alamat Pemohon': address,
      'Nama Perusahaan': companyName,
      'NIB': NIB,
      'Nomor Telepon/WA': telephoneNum,
      ...result.result,
    })
  }, [nama, address, companyName, NIB, telephoneNum])

  return (
    <section id="dataPemohon" className="flex flex-col gap-1 mb-2">
      <h1 className="font-bold">
        A. <span className="underline">Data Pemohon</span>
      </h1>

      <div>
        <label htmlFor="name">Nama Pemohon (Orang/Badan Usaha) *</label>
        <input
          id="name"
          type="text"
          className="form-input"
          placeholder="Wajib diisi!"
          required
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="address">Alamat Pemohon (Orang/Badan Usaha) *</label>
        <textarea
          id="address"
          className="form-input"
          cols="30"
          rows="3"
          placeholder="Wajib diisi!"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor="companyName">Nama Perusahaan</label>
        <input
          id="companyName"
          type="text"
          className="form-input"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="NIB">Nomor Induk Berusaha (NIB)</label>
        <input
          id="NIB"
          type="text"
          className="form-input"
          placeholder="Bagi pemohon yang mengajukan KKPR untuk usaha."
          value={NIB}
          onChange={(e) => setNIB(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="telephoneNum">
          Nomor Telepon/WA yang Masih Aktif *
        </label>
        <input
          id="telephoneNum"
          type="tel"
          className="form-input"
          placeholder="Wajib diisi!"
          required
          value={telephoneNum}
          onChange={(e) => setTelephoneNum(e.target.value)}
        />
      </div>
    </section>
  );
}

export default DataPemohon;
