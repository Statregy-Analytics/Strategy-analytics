
const actions = {
  getAccount(payload) {
    let getJson = [];
    getJson = {
      ...this.data.user_bank_accounts.filter((a) => {
        return a.id == payload;
      }),
    };
    const teste = { ...getJson[0] };
    // console.log("vendpo getJson[0]->", getJson[0]);
    // console.log("vendpo stor->", teste);
    this.accountEdit = teste;
  },

  setUserData(payload) {
    // Normalizar o payload recebido para um formato consistente dentro da store.
    // O backend pode retornar diferentes formatos (top-level cliente, cliente.cliente, account, etc.).
    const p = payload || {};

    // derivar objeto cliente preferencialmente de p.cliente, p.client, ou propriedades top-level
    const clienteSrc = p.cliente || p.client || {};

    const cliente = {
      // copiar propriedades conhecidas quando existentes
      ...(typeof clienteSrc === 'object' ? clienteSrc : {}),
    };

    // se não havia cliente no payload, tentar extrair campos sensíveis do objeto raiz
    if (!p.cliente && !p.client) {
      ['name', 'email', 'cpf', 'rg', 'telefone', 'phone', 'birth', 'birthday', 'id'].forEach((k) => {
        if (p[k] !== undefined && cliente[k] === undefined) cliente[k] = p[k];
      });
    }

    // garantir account
    const account = p.account || cliente.account || {};

    // padronizar nomes de data/telefone para ambos os campos possíveis
    if (cliente.birth && !cliente.birthday) cliente.birthday = cliente.birth;
    if (cliente.birthday && !cliente.birth) cliente.birth = cliente.birthday;
    if (account.birthday && !cliente.birthday) cliente.birthday = account.birthday;
    if (account.birth && !cliente.birth) cliente.birth = account.birth;

    if (cliente.telefone && !account.phone) account.phone = cliente.telefone;
    if (cliente.phone && !account.phone) account.phone = cliente.phone;
    if (account.phone && !cliente.telefone) cliente.telefone = account.phone;

    // construir objeto final usado internamente
    const normalized = {
      ...p,
      cliente: { ...cliente },
      account: { ...account },
    };

    this.data = { ...normalized };
    this.isDirty = { ...normalized };
    this.isDirtyData = { ...normalized.account };
    this.NavbarMenu = normalized.role_id == 3 ? 'client' : 'admin';
    this.wallet = normalized.role_id === 3 ? { ...(normalized.user_wallet || normalized.cliente.user_wallet || {}) } : "";
    this.loan = normalized.investment ? normalized.loan : "";
    this.investment = normalized.investment ? normalized.investment : "";
  },
  setAvatarUpload(payload) {
    this.data.account.avatar = payload;
  },
  setRouteHome(payload) {
    this.routeHome = payload
  },
  setLoan(payload) {
    this.loan = payload;
  },
  setAbilities(payload) {
    this.abilities = payload;
  },
  setClear() {
    this.accountEdit = {}
    this.data = {}
    this.loan = {}
    this.wallet = {}
    this.investment = {}
    this.abilities = {}
    this.routeHome = ""
    this.NavbarMenu = "adm"
  },
  setEmailVerified(payload) {
    this.data.email_verified_at = payload
  },
  setWalletChart(payload) {
    this.walletChart = payload
  },
  setWallet(payload) {
    this.wallet = payload
  }

};

export default { ...actions };
