import React, { useState} from "react";

export const mapContext = React.createContext();

function MapContext({ children }) {
  const [identitasReklame, setIdentitasReklame] = useState({});
  const [pelanggaranReklame, setPelanggaranReklame] = useState({});
  const [tindakan, setTindakan] = useState({});
  const [reklameIsClicked, setReklameIsClicked] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState([])

  return (
    <mapContext.Provider
      value={{
        identitasReklame,
        setIdentitasReklame,
        pelanggaranReklame,
        setPelanggaranReklame,
        tindakan,
        setTindakan,
        reklameIsClicked,
        setReklameIsClicked,
        showFilter,
        setShowFilter,
        filterCriteria,
        setFilterCriteria
      }}
    >
      {children}
    </mapContext.Provider>
  );
}

export default MapContext;
