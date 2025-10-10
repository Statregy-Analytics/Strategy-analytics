const actions = {
  setTable(payload) {
    this.table = payload;
  },
  setNavTheme(payload) {
    this.navbar.theme = payload;
  },
  setNavClock(payload) {
    this.navbar.clock = payload;
  },
  setSystemTheme(payload) {
    this.system.theme = payload;
  },
  setDrawerTheme(payload) {
    this.drawerTheme = payload;
  },
  setMenuAdm(payload) {
    this.menuAdm = payload
  },
  setViewWalletValue(payload) {
    this.view_wallet_value = payload
  }
};

export default { ...actions };
