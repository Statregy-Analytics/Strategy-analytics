const state = () => {
  return {
    filters: {
      layout: "text-imagem",
      search: "",
      typeOptions: [
        { label: "Selecione uma opção", value: "Selecione uma opção" },
        { label: "Notícias", value: "news" },
        { label: "Eventos", value: "events" },
        { label: "Alertas", value: "alerts" },
      ],
      authorOptions: [
        { label: "Selecione uma opção", value: "Selecione uma opção" },
        { label: "Autor 1", value: "author_1" },
        { label: "Autor 2", value: "author_2" },
      ],
      dateOptions: [
        { label: "Selecione uma opção", value: "Selecione uma opção" },
        { label: "Última semana", value: "last_week" },
        { label: "Último mês", value: "last_month" },
        { label: "Último ano", value: "last_year" },
      ],
      selectedType: "Selecione uma opção",
      selectedDate: "Selecione uma opção",
      selectedAuthor: "Selecione uma opção",
      onlyNew: false
    }
  };
};

export default state;
