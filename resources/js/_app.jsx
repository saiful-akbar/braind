import "./bootstrap";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import store from "./redux/store";
import Document from "./_document";

const appName = import.meta.env.VITE_APP_NAME || "Braind";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.jsx`,
      import.meta.glob("./pages/**/*.jsx")
    );
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Provider store={store}>
        <Document>
          <App {...props} />
        </Document>
      </Provider>
    );
  },
  progress: false,
});
