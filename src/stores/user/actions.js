
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
    // Normalizar o payload recebido para aderir à estrutura do backend.
    // Estrutura esperada (exemplo):
    // {
    //  id, cliente: { name,email,avatar,cpf,rg,telefone,cnh,birth,... }, bank, bankRegister, residential, investment, password, contrato, level, weLend, newWeLend, uploads
    // }
    const p = payload || {};

    // Obter a fonte do objeto cliente (p.cliente, p.client ou top-level)
    const srcCliente = (p.cliente && typeof p.cliente === 'object') ? p.cliente : ((p.client && typeof p.client === 'object') ? p.client : p);

    const cliente = {
      name: srcCliente.name || srcCliente.nome || p.name || '',
      email: srcCliente.email || p.email || '',
      avatar: srcCliente.avatar || srcCliente.photo || '',
      cpf: srcCliente.cpf || srcCliente.cpf_cnpj || (p.cpf || p.cpf_cnpj) || '',
      rg: srcCliente.rg || srcCliente.identidade || '',
      telefone: srcCliente.telefone || srcCliente.phone || srcCliente.telefone_principal || '',
      cnh: srcCliente.cnh || '',
      birth: srcCliente.birth || srcCliente.birthday || p.birth || p.birthday || '',
      profissao: srcCliente.profissao || srcCliente.profession || null,
      rendaAnual: srcCliente.rendaAnual || srcCliente.renda_anual || null,
      bank: srcCliente.bank || {},
      // manter qualquer campo extra existente no cliente
      ...srcCliente
    };

    // Construir objeto normalizado com campos top-level do backend
    const normalized = {
      id: p.id || cliente.id || p.cliente?.id || p.client?.id || null,
      cliente: { ...cliente },
      // manter compatibilidade com componentes que usam `data.account`
      // mapear p.account ou p.bank ou cliente.account e propagar campos de `residential`
      bank: p.bank || p.account || cliente.bank || {},
      account: (function () {
        const acc = (p.account && typeof p.account === 'object') ? { ...p.account } : (cliente.account ? { ...cliente.account } : {});
        // mapear campos comuns de residential para account (endereços)
        const res = p.residential || p.residence || p.residential || {};
        if (res) {
          if (res.address_zip_code) acc.address_zip_code = acc.address_zip_code || res.address_zip_code
          // suportar address_state ou address_uf no payload
          if (res.address_state) acc.address_state = acc.address_state || res.address_state
          if (res.address_uf) acc.address_uf = acc.address_uf || res.address_uf
          if (!acc.address_uf && res.address_state) acc.address_uf = acc.address_uf || res.address_state
          if (res.address_city) acc.address_city = acc.address_city || res.address_city
          if (res.address_street) acc.address_street = acc.address_street || res.address_street
          if (res.address_district) acc.address_district = acc.address_district || res.address_district
          if (res.address_complement) acc.address_complement = acc.address_complement || res.address_complement
        }
        // garantir avatar em account para compatibilidade com componentes que o esperam
        acc.avatar = acc.avatar || cliente.avatar || ''
        return acc
      })(),
      bankRegister: p.bankRegister || p.bank_register || p.bankregister || [],
      residential: p.residential || p.residence || p.residential || {},
      investment: p.investment || {},
      contrato: p.contrato || { total: 0, quantity: 0 },
      level: p.level || '',
      weLend: p.weLend || [],
      newWeLend: p.newWeLend || {},
      uploads: p.uploads || [],
      // incluir quaisquer campos remanescentes do payload para compatibilidade
      ...p
    };

    // Não armazenar senha em claro na store
    if (normalized.password) delete normalized.password;

    // Garantir que telefone e birth also exist on top-level for older components
    try {
      if (!normalized.phone && (normalized.cliente.telefone || normalized.cliente.phone)) normalized.phone = normalized.cliente.telefone || normalized.cliente.phone;
      if (!normalized.birthday && (normalized.cliente.birth || normalized.cliente.birthday)) normalized.birthday = normalized.cliente.birth || normalized.cliente.birthday;
    } catch (e) { /* noop */ }

    this.data = { ...normalized };
    this.isDirty = { ...normalized };
    this.isDirtyData = { ...(normalized.cliente || {}) };
    this.NavbarMenu = (normalized.cliente && normalized.cliente.role_id == 3) || (normalized.role_id == 3) ? 'client' : 'admin';
    this.wallet = (normalized.role_id === 3 || (normalized.cliente && normalized.cliente.role_id === 3)) ? { ...(normalized.user_wallet || normalized.cliente?.user_wallet || {}) } : "";
    this.loan = normalized.investment ? normalized.loan : "";
    this.investment = normalized.investment ? normalized.investment : "";
    // Log normalized user for debugging (avoid leaking passwords)
    try {
      const debugCopy = JSON.parse(JSON.stringify(normalized));
      if (debugCopy.password) delete debugCopy.password;
      if (debugCopy.cliente && debugCopy.cliente.password) delete debugCopy.cliente.password;
      console.debug('[setUserData] normalized user stored in store:', debugCopy);
    } catch (e) { }
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
