import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "PT Serif",
  src: "https://fonts.gstatic.com/s/ptserif/v8/EgBlzoNBIHxNPCMwXaAhYPesZW2xOQ-xsNqO47m55DA.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
    fontFamily: "PT Serif",
  },
  title: {
    // fontFamily: "PT Serif",
    fontSize: 14,
    textAlign: "center",
    textDecoration: "underline",
    marginBottom: 20,
  },
  section: {
    // margin: 10,
    flexDirection: "column",
  },
  text: {
    margin: 5,
    fontSize: 12,
    textAlign: "justify",
    // lineHeight: "1.6 ",
  },
});

const listDasarHukum = [
  "Undang-undang Nomor 26 Tahun 2007 tentang Penataan Ruang sebagaimana telah diubah dengan Undang-undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
  "Peraturan Pemerintah Nomor 21 Tahun 2021 tentang Penyelenggaraan Penataan Ruang",
  "Peraturan Daerah Nomor 2 Tahun 2021 tentang Rencana Tata Ruang Wilayah Kota Yogyakarta Tahun 2021-2041",
  "Peraturan Walikota Yogyakarta Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021-2041",
  "Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame",
  "Peraturan Walikota Yogyakarta Nomor 32 Tahun 2023 Tentang Peraturan Pelaksanaan Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 Tentang Reklame",
  "Telaah Dinas Pertanahan dan Tata Ruang Kota Yogyakarta Nomor 305 / TKKPRR / DPTR / II / 2024 Tanggal 22 Februari 2024",
];

function FormData({ label, value }) {
  return (
    <View style={{marginLeft: 20, display: "flex", flexDirection: "row" }}>
      <Text style={[styles.text, { width: "35%" }]}>{label}</Text>
      <Text style={styles.text}>:</Text>
      <Text style={[styles.text, { width: "65%" }]}>{value}</Text>
    </View>
  );
}

function PdfVanilla({ result }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            KESESUAIAN KEGIATAN PEMANFAATAN RUANG (KKPR)
          </Text>
          <Text style={styles.text}>DASAR HUKUM</Text>
        </View>

        {listDasarHukum.map((item, index) => {
          return (
            <View key={index} style={{ display: "flex", flexDirection: "row" }}>
              <Text style={[styles.text]}>{index + 1}.</Text>
              <Text style={[styles.text]}>{item}</Text>
            </View>
          );
        })}

        {/* <View style={styles.section}>
          <Text>A. Keterangan Lokasi</Text>
          <Text>{result["Rencana Penempatan"]}</Text>
        </View> */}
        {/* {Object.entries(result).map(([key, value], index) => {
          return <FormData key={index} label={`${index + 1}) ${key}`} value={value} />;
        })} */}

        <View style={{display: "flex", flexDirection: "row", backgroundColor: "#C8C8C8"}}>
          <Text style={styles.text}>A.</Text>
          <Text style={[styles.text, {textDecoration: "underline"}]}>Data Pemohon</Text>
        </View>
        <FormData label="1) Nama" value={result["Nama Pemohon"]} />
        <FormData label="2) Alamat" value={result["Alamat Pemohon"]} />
        <FormData label="3) Nomor Telepon/WA" value={result["Nomor Telepon/WA"]} />
        {result["Nama Perusahaan"] !== "" ? <FormData label="4) Nama Perusahaan" value={result["Nama Perusahaan"]} /> : null}
        {result["NIB"] !== "" ? <FormData label="5) NIB" value={result["NIB"]} /> : null}
        
        <View style={{display: "flex", flexDirection: "row", backgroundColor: "#C8C8C8"}}>
          <Text style={styles.text}>B.</Text>
          <Text style={[styles.text, {textDecoration: "underline"}]}>Keterangan Lokasi</Text>
        </View>
        <FormData label="1) Sudut Simpang" value={result["Sudut Simpang"]} />
        <FormData label="2) Koordinat Lintang" value={result["Koordinat Lintang"]} />
        <FormData label="3) Koordinat Bujur" value={result["Koordinat Bujur"]} />
        <FormData label="4) Kemantren" value={result["Kemantren"]} />
        <FormData label="5) Kelurahan" value={result["Kelurahan"]} />
        <FormData label="6) Lokasi Reklame" value={result["Lokasi Reklame"]} />
        <FormData label="7) Rencana Penempatan" value={result["Rencana Penempatan"]} />
        <FormData label="8) Kategori Persil" value={result["Kategori Persil"]} />
        {/* <FormData label="9) Denah Lokasi" value={"Coming soon"} /> */}

        <View style={{display: "flex", flexDirection: "row", backgroundColor: "#C8C8C8"}}>
          <Text style={styles.text}>C.</Text>
          <Text style={[styles.text, {textDecoration: "underline"}]}>Spesifikasi Reklame</Text>
        </View>
        <FormData label="1) Jenis Reklame" value={result["Jenis Reklame"]} />
        <FormData label="2) Ukuran Reklame" value={result["Ukuran Reklame"]} />
        <FormData label="3) Kategori Ukuran" value={result["Kategori Ukuran"]} />
        <FormData label="4) Sisi Hadap" value={result["Sisi Hadap"]} />
        {/* <FormData label="5) Foto" value={"Coming soon"} /> */}
        <FormData label="5) Naskah" value={result["Naskah"]} />
        {result["Naskah Produk Lainnya"] !== "" ? <FormData label="6) Naskah Produk Lainnya" value={result["Naskah Produk Lainnya"]} /> : null}

        <View style={{display: "flex", flexDirection: "row", backgroundColor: "#C8C8C8"}}>
          <Text style={styles.text}>D.</Text>
          <Text style={[styles.text, {textDecoration: "underline"}]}>Kesimpulan</Text>
        </View>
        {/* <FormData label="1) Pola pemanfaatan ruang" value={"Coming soon"} /> */}
        {/* <FormData label="2) Ketentuan Zonasi" value={"Coming soon"} /> */}
        {/* <FormData label="3) Ketentuan Lainnya" value={"Coming soon"} /> */}
        <hr></hr>
        
        {/* {Object.entries(result).map(([key, value], index) => {
          return (
            <View key={index}>
              <Text style={styles.text}>
                {key} : {value}
              </Text>
            </View>
          );
        })} */}
        {/* <View style={styles.section}>
          {Object.entries(result).map(([key, value]) => {
            // console.log(index, key, value);
            return (
              <Text key={key} style={styles.text}>
                {key} : {value}
              </Text>
            );
          })}
        </View> */}

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.text}>1)</Text>
          <Text style={styles.text}>
            Informasi Ketentuan Tata Ruang BUKAN MERUPAKAN IZIN, namun dokumen yang berisikan informasi tentang ketentuan tata ruang pada lokasi yang dimaksud sesuai dengan ketentuan peraturan yang berlaku;
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.text}>2)</Text>
          <Text style={styles.text}>
            Apabila terjadi perubahan peraturan, maka informasi ketentuan tata ruang ini dinyatakan tidak berlaku;
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.text}>3)</Text>
          <Text style={styles.text}>
            Apabila ada kekeliruan maka informasi ketentuan tata ruang ini dapat ditinjau ulang.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PdfVanilla;
