import AdvertisingApplication from "./components/AdvertisingApplication/AdvertisingApplication";
import MapContext from "./components/Context/MapContext";
import Infobar from "./components/Infobar";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="relative flex w-screen h-screen overflow-x-hidden">
      <MapContext>
        <Sidebar />
        <Map />
      </MapContext>

      {/* <AdvertisingApplication /> */}
      {/* <Infobar /> */}
    </div>
  );
}

export default App;
