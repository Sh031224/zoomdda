import VueCookie from "vue-cookie";

export default function({ store, route, next }) {
  if (
    !VueCookie.get("school_token") &&
    (route.name === "index" || route.name === "select")
  ) {
    alert("학교에서 제공된 url로 접속해주세요.");
    return next({ name: "close" });
  }
}
