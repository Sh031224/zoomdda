export const state = () => ({
  access: "",
  admin: false
});

export const mutations = {
  changeAccess(state, access) {
    state.access = access;
  },
  changeAdmin(state, newAdmin) {
    state.admin = newAdmin;
  }
};
