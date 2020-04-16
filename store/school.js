export const state = () => ({
  school_token: "",
  class: "",
  name: ""
});

export const mutations = {
  changeToken(state, school_token) {
    state.school_token = school_token;
  },
  addClass(state, CLASS) {
    state.class = CLASS;
  },
  addName(state, name) {
    state.name = name;
  }
};
