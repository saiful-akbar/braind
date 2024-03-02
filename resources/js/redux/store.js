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
  },
});

export default store;
