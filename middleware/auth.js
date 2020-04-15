import axios from "axios";
import VueCookie from "vue-cookie";

export default function({ store, route, next }) {
  if (VueCookie.get("access") === store.state.access) {
    store.state.admin = true;
    axios.defaults.headers.common.access_code = VueCookie.get("access");
  }

  if (VueCookie.get("school_token")) {
    store.state.school_token = VueCookie.get("school_token");
    axios.defaults.headers.common["school-token"] = VueCookie.get(
      "school_token"
    );
  } else if (route.name !== "school") {
    return next({ name: "close" });
  }

  if (route.name === "index") {
    if (!VueCookie.get("grade") || !VueCookie.get("room")) {
      return next({ name: "select" });
    }
  }
}
