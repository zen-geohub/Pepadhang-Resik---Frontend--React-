function Legend() {
  return (
    <div className="absolute bottom-[10px] left-12 z-10 bg-white rounded-md w-fit h-[88px] p-2 flex flex-col gap-1">
      <h1 className="font-bold text-[14px]">Legenda</h1>
      <div className="flex gap-2 items-center">
        <span className="w-4 h-4 bg-[#60C3E0]"></span>
        <p>Reklame Ukuran Sedang</p>
      </div>

      <div className="flex gap-2 items-center">
        <span className="w-4 h-4 bg-[#105E8C]"></span>
        <p>Reklame Ukuran Besar</p>
      </div>
    </div>
  );
}

export default Legend;
