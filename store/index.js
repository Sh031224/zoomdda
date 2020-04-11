import Vuex from "vuex";
import server from "~/models/server";
import access_code from "~/models/access";

const store = () =>
  new Vuex.Store({
    state: {
      url: server,
      access: access_code,
      admin: false
    },
    mutations: {}
  });

export default store;
