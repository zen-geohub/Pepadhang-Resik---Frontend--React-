import React, { useContext, useState } from "react";
import AdvertisingForm from "./AdvertisingForm";
import AdvertisingSubmit from "./AdvertisingSubmit";
import ApplicationResult from "../Context/ApplicationResult";
import { PDFViewer } from "@react-pdf/renderer";

export const SubmitContext = React.createContext();

function AdvertisingApplication() {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <SubmitContext.Provider value={{ isSubmit, setIsSubmit }}>
      <ApplicationResult>
        {isSubmit ? <AdvertisingSubmit /> : <AdvertisingForm />}
      </ApplicationResult>
    </SubmitContext.Provider>
  );
}

export default AdvertisingApplication;
