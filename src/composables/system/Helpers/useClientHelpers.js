import useNotify from 'src/composables/useNotify'
import { ref } from 'vue'
import { date } from 'quasar'
import useClient from '../Requests/useClient';

export default function useClientHelpers() {
  const { getExtract } = useClient()
  const columnsClient = [
    // {
    //   name: "id",
    //   required: true,
    //   label: "ID",
    //   align: "left",
    //   field: (row) => row.id,
    //   format: (val) => `#${val}`,
    //   sortable: true,
    //   required: true,

    // },
    {
      name: "avatar",
      required: true,
      label: "#",
      align: "left",
      field: (row) => row.avatar,
      format: (val) => `https://testapi.strategyanalytics.com.br/storage/users/${val}`,
      sortable: true,
      required: true
    },
    {
      name: "name",
      align: "left",
      label: "Nome",
      field: "name",
      sortable: true,
    },
    {
      name: "email",
      align: "left",
      label: "Email",
      field: "email",
      sortable: true,
    },
    {
      name: "balance",
      align: "left",
      label: "Saldo",
      field: "balance",
      sortable: true,
    },
    // {
    //   name: "loan",
    //   align: "left",
    //   label: "Saldo devedor",
    //   field: "loan",
    //   sortable: true,
    // },
    {
      name: "investment",
      align: "left",
      label: "Saldo investido",
      field: "current_investment",
      sortable: true,
    },
    // {
    //   name: "Rendimento",
    //   align: "left",
    //   label: "Rendimento",
    //   field: "investment",
    //   sortable: true,
    // },
    {
      name: "actions",
      label: "Ações",
      align: "center",
      field: "action",
    },
  ];
  const roleControl = ref(false);
  const controlIncome = ref(false);
  const viewExtract = ref(false);
  const userEdit = ref();

  const actions = {
    editIncome: (e) => {
      controlIncome.value = true;
      userEdit.value = e;
    },
    extractView: async (e) => {
      // await getExtract(e.id)
      userEdit.value = e;
      viewExtract.value = true
      console.log('extractView', e.id);
    },
    editRole: (e) => {
      roleControl.value = true;
      userEdit.value = e;
    },
  };
  const btnActions = [
    // {
    //   color: "green",
    //   icon: "fa-solid fa-user-lock",
    //   tooltipText: "Mudar permissão do usuário",
    //   action: "editRole",
    // },
    // {
    //   color: "green",
    //   icon: "fa-solid fa-cash-register",
    //   tooltipText: "Ver extrato do usuário",
    //   action: "extractView",
    // },
    {
      color: "green",
      icon: "fa-solid fa-money-bill-trend-up",
      tooltipText: "Ver rendimentos",
      action: "editIncome",
    },
  ];
  const handlerAction = (name, row) => {
    actions[name](row);
  };
  return {
    columnsClient,
    actions,
    btnActions,
    roleControl,
    controlIncome,
    userEdit,
    viewExtract,
    handlerAction
  }
}
