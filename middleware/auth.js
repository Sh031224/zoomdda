import axios from "axios";
import VueCookie from "vue-cookie";

export default function({ store, route, next }) {
  if (VueCookie.get("access") === store.state.access) {
    store.state.admin = true;
    axios.defaults.headers.common.access_code = VueCookie.get("access");
  }
  if (route.name === "index") {
    if (!VueCookie.get("grade") || !VueCookie.get("room")) {
      return next({ name: "select" });
    }
  }
}
