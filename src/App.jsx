import AdvertisingApplication from "./components/AdvertisingApplication/AdvertisingApplication";
import Infobar from "./components/Infobar";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <div className="relative flex w-screen h-screen overflow-x-hidden">
      <Sidebar />
      <Map />

      

      {/* <AdvertisingApplication /> */}
      {/* <Infobar /> */}
    </div>
  );
}

export default App;
