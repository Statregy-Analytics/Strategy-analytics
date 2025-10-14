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
    this.dashboard.view_wallet_value = payload
  },
  setToggleViewWalletValues() {
    this.dashboard.view_wallet_value = (this.dashboard.view_wallet_value = !this.dashboard.view_wallet_value)
  }
};

export default { ...actions };
