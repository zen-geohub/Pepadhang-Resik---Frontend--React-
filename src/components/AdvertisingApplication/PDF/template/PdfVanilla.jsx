import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import React from "react";

// Object.entries(keteranganLokasi).map(([key, value]) => {
//   console.log(key, value);
// })
Font.register({
  family: 'test',
  src: 'http://fonts.gstatic.com/s/ptserif/v8/EgBlzoNBIHxNPCMwXaAhYPesZW2xOQ-xsNqO47m55DA.ttf'
})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#333333",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
    // fontFamily: "Times-Roman",
  },
  title: {
    fontFamily: "Times-Bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    // margin: 10,
    flexDirection: "column",
  },
  text: {
    // fontSize: 10,
    // fontFamily: "Times-Roman",
    // textAlign: "justify",
    margin: 5,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "test",
    lineHeight: "1.6 ",
  },
});

const listDasarHukum = [
  "Undang-Undang Nomor 26 Tahun 2007 sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020",
  "Peraturan Pemerintah Nomor 21 Tahun 2021",
  "Peraturan Daerah Nomor 2 Tahun 2011",
  "Peraturan Walikota Yogyakarta Nomor 118 Tahun 2021",
  "Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022",
  "Peraturan Walikota Yogyakarta Nomor 32 Tahun 2023",
  "Telaah Dinas Pertanahan dan Tata Ruang Kota Yogyakarta Nomor 305 / TKKPRR / DPTR / II / 2024",
];
// const listDasarHukum = [
//   "Undang-Undang Nomor 26 Tahun 2007 tentang Penataan Ruang sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
//   "Peraturan Pemerintah Nomor 21 Tahun 2021 tentang Penyelenggaraan Penataan Ruang",
//   "Peraturan Daerah Nomor 2 Tahun 2011 tentang Rencana Tata Ruang Wilayah Kota Yogyakarta Tahun 2021-2041",
//   "Peraturan Walikota Yogyakarta Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021-2041",
//   "Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame",
//   "Peraturan Walikota Yogyakarta Nomor 32 Tahun 2023 tentang Peraturan Pelaksanaan Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame",
//   "Telaah Dinas Pertanahan dan Tata Ruang Kota Yogyakarta Nomor 305 / TKKPRR / DPTR / II / 2024 Tanggal 22 Februari 2024",
// ];

function PdfVanilla({ result }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Formulir Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)
          </Text>
          <Text style={{fontFamily: 'Times-Roman'}}>DASAR HUKUM</Text>
        </View>

        {listDasarHukum.map((item, index) => {
          return (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text key={Math.random()} style={[styles.text]}>
                {index + 1}.
              </Text>
              <Text key={Math.random()} style={[styles.text]}>
                {item}
              </Text>
            </View>
          );
        })}

        {/* <View style={styles.section}>
          <Text>A. Keterangan Lokasi</Text>
          <Text>{result["Rencana Penempatan"]}</Text>
        </View> */}

        <Text style={[styles.text, {fontWeight: "bold"}]}>A. Data Pemohon</Text>
        <View style={styles.section}>
          {Object.entries(result).map(([key, value]) => {
            // console.log(index, key, value);
            return (
              <Text key={key} style={styles.text}>
                {key} : {value}
              </Text>
            );
          })}
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={[styles.text, { fontFamily: "Times-Italic" }]}>3)</Text>
          <Text style={[styles.text, { fontFamily: "Times-Italic" }]}>
            Apabila ada kekeliruan maka informasi ketentuan tata ruang ini dapat
            ditinjau ulang
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={[styles.text, { fontFamily: "Times-Italic" }]}>3)</Text>
          <Text style={[styles.text, { fontFamily: "Times-Italic" }]}>
            Apabila ada kekeliruan maka informasi ketentuan tata ruang ini dapat
            ditinjau ulang
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PdfVanilla;
