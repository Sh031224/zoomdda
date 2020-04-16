import axios from "axios";
import VueCookie from "vue-cookie";

export default function({ store, route, next }) {
  if (VueCookie.get("school_token")) {
    store.commit("school/changeToken", VueCookie.get("school_token"));
    axios.defaults.headers.common["school-token"] = VueCookie.get(
      "school_token"
    );
  }

  if (route.name === "index") {
    if (!VueCookie.get("grade") || !VueCookie.get("room")) {
      return next({ name: "select" });
    }
  }
}
