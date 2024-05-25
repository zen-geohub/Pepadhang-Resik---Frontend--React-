import { useState, useContext } from "react";
import { mapContext } from "../Context/MapContext";

function Filter({filterState, map}) {
  const filter = useContext(mapContext)

  const [filterUkuran, setFilterUkuran] = useState("")
  const [filterJenisReklame, setFilterJenisReklame] = useState("")
  const [filterNaskah, setFilterNaskah] = useState("")

  function handleApplyFilter() {
    filter.setFilterCriteria([])
    
    function getFilter(property, value) {
      if (value !== "") {
        filter.filterCriteria.push(['==', ['get', property], value])
      }
    }

    getFilter('ukuran', filterUkuran)
    getFilter('jenis_rklm', filterJenisReklame)
    getFilter('naskah', filterNaskah)
    
    map.setFilter('reklamePoint', ['all', ...filter.filterCriteria])
  }

  function handleResetFilter() {
    setFilterUkuran("")
    setFilterJenisReklame("")
    setFilterNaskah("")

    filter.setFilterCriteria([])
  }

  const show = "bg-white w-36 h-fit absolute top-1 left-0 text-sm transition-transform duration-300 translate-x-40  z-10 p-2 rounded-md flex flex-col"
  const hidden = "bg-white w-36 h-fit absolute top-1 left-0 text-sm transition-transform duration-300 -translate-x-48 z-10 p-2 rounded-md flex flex-col"

  return (
    <div className={filterState ? show : hidden}>
      <label htmlFor="ukuran"><strong>Ukuran</strong></label>
      <select id="ukuran" className="form-input" onChange={(e) => setFilterUkuran(e.target.value)}>
        <option defaultValue={""}></option>
        <option value="Sedang">Sedang</option>
        <option value="Besar">Besar</option>
      </select>

      <label htmlFor="jenisReklame"><strong>Jenis Reklame</strong></label>
      <select id="jenisReklame" className="form-input" onChange={(e) => setFilterJenisReklame(e.target.value)}>
        <option defaultValue={""}></option>
        <option value="Billboard">Billboard</option>
        <option value="Huruf Timbul">Huruf Timbul</option>
        <option value="Reklame Huruf">Reklame Huruf</option>
        <option value="Reklame Kain">Reklame Kain</option>
        <option value="Videotron">Videotron</option>
      </select>

      <label htmlFor="naskah"><strong>Naskah</strong></label>
      <select id="naskah" className="form-input" onChange={(e) => setFilterNaskah(e.target.value)}>
        <option defaultValue={""}></option>
        <option value="Kosong">Kosong</option>
        <option value="Non Usaha">Non Usaha</option>
        <option value="Usaha">Usaha</option>
        <option value="Rokok">Rokok</option>
      </select>

      <div className="flex gap-2 mt-2">
        <button onClick={handleApplyFilter} className="btn-primary w-full">Terapkan</button>
        {/* <button onClick={handleResetFilter} className="btn-secondary w-[40%]">Reset</button> */}
      </div>
    </div>
  );
}

export default Filter;
