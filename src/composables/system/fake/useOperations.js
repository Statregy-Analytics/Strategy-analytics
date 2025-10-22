import useNotify from 'src/composables/useNotify'
import { ref } from 'vue'
import { date } from 'quasar'
import useClient from '../Requests/useClient';

export default function useOperations() {
  // const { getExtract } = useClient()
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
    {
      name: "Rendimento",
      align: "left",
      label: "Rendimento",
      field: "investment",
      sortable: true,
    },
    {
      name: "actions",
      label: "Ações",
      align: "center",
      field: "action",
    },
  ];


  return {
    columnsClient,

  }
}
