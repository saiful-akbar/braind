import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loadingReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import settingsReducer from "./reducers/settingsReducer";
import notificationReducer from "./reducers/notificationReducer";
import kantorReducer from "./reducers/kantorReducer";
import komoditiReducer from "./reducers/komoditiReducer";
import sbpReducer from "./reducers/sbpReducer";
import perusahaanHtHptlReducer from "./reducers/perusahaanHtHptlReducer";
import perusahaanMmeaReducer from "./reducers/perusahaanMmeaReducer";
import perusahaanReducer from "./reducers/perusahaanReducer";
import perusahaanExportReducer from "./reducers/perusahaanExportReducer";
import perusahaanImportReducer from "./reducers/perusahaanImportReducer";
import penerimaanReducer from "./reducers/penerimaanReducer";
import pengawasanReducer from "./reducers/pengawasanReducer";
import penindakanReducer from "./reducers/penindakanReducer";
import operasiAlatPemindaiReducer from "./reducers/operasiAlatPemindaiReducer";
import operasiAlatTelekomunikasiReducer from "./reducers/operasiAlatTelekomunikasiReducer";
import operasiKapalPatroliReducer from "./reducers/operasiKapalPatroliReducer";
import operasiSenjataApiReducer from "./reducers/operasiSenjataApiReducer";
import operasiLainnyaReducer from "./reducers/operasiLainnyaReducer";
import galeriReducer from "./reducers/galeriReducer";
import petaKerawananReducer from "./reducers/petaKerawananReducer";
import reportReducer from "./reducers/reportReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import ekspedisiReducer from "./reducers/ekspedisiReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    loading: loadingReducer,
    settings: settingsReducer,
    notification: notificationReducer,
    kantor: kantorReducer,
    komoditi: komoditiReducer,
    sbp: sbpReducer,
    perusahaanHtHptl: perusahaanHtHptlReducer,
    perusahaanMmea: perusahaanMmeaReducer,
    perusahaan: perusahaanReducer,
    perusahaanExport: perusahaanExportReducer,
    perusahaanImport: perusahaanImportReducer,
    penerimaan: penerimaanReducer,
    pengawasan: pengawasanReducer,
    penindakan: penindakanReducer,
    operasiAlatPemindai: operasiAlatPemindaiReducer,
    operasiAlatTelekomunikasi: operasiAlatTelekomunikasiReducer,
    operasiKapalPatroli: operasiKapalPatroliReducer,
    operasiSenjataApi: operasiSenjataApiReducer,
    operasiLainnya: operasiLainnyaReducer,
    galeri: galeriReducer,
    petaKerawanan: petaKerawananReducer,
    report: reportReducer,
    dashboard: dashboardReducer,
    ekspedisi: ekspedisiReducer,
  },
});

export default store;
