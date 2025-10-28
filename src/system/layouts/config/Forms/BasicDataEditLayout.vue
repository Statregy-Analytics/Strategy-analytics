<template>
  <div :class="templateClass" class="basic-data-edit-layout">
    <label-form className="col-12 col-sm-6" textLabel="Nome Completo">
      <q-input v-model="data.name" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Gênero">
      <q-select
        v-model="data.genre"
        :options="optionsGenre"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Estado Civil">
      <q-select
        v-model="data.civil"
        :options="optionsCivil"
        class="q-mb-md"
        outlined
        dense
      />
    </label-form>
    <div class="col-12"></div>
    <label-form className="col-12 col-sm-4" textLabel="Nacionalidade">
      <q-input v-model="data.nacionalidade" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm-6" textLabel="Naturalidade - Cidade">
      <q-input
        v-model="naturalidadeCity"
        class="q-mb-md"
        outlined
        dense
        placeholder="ex.: São José dos Campos"
      />
    </label-form>
    <label-form className="col-12 col-sm-2" textLabel="UF">
      <q-input
        v-model="naturalidadeUf"
        class="q-mb-md"
        outlined
        dense
        placeholder="SP"
      />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Data de Nascimento">
      <q-input
        v-model="data.birthday"
        class="q-mb-md"
        outlined
        dense
        type="date"
      />
    </label-form>
    <div class="col-12"></div>
    <label-form className="col-12 col-sm" textLabel="Email">
      <q-input v-model="data.email" class="q-mb-md" outlined dense>
        <template v-slot:prepend>
          <IconMail width="16" height="16" color="#ece" />
        </template>
      </q-input>
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Celular">
      <q-input
        v-model="data.phone"
        class="q-mb-md"
        outlined
        dense
        placeholder="(DDD) 00000-0000"
      >
        <template v-slot:prepend>
          <IconPhone width="16" height="16" color="#ece" />
        </template>
      </q-input>
    </label-form>
    <div class="col-12"></div>
    <label-form className="col-12 col-sm" textLabel="Nome Completo da Mãe">
      <q-input v-model="data.mother" class="q-mb-md" outlined dense />
    </label-form>
    <label-form className="col-12 col-sm" textLabel="Nome Completo do Pai">
      <q-input v-model="data.father" class="q-mb-md" outlined dense />
    </label-form>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import LabelForm from "src/system/components/form/LabelForm.vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

defineComponent({
  name: "BasicDataEditLayout",
});
defineProps({
  templateClass: { type: String, default: "row q-gutter-x-sm" },
});
const optionsGenre = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
  { label: "Não informar", value: "O" },
];
const optionsCivil = [
  { label: "Casado(a)", value: "M" },
  { label: "Solteiro(a)", value: "F" },
  { label: "Não informar", value: "O" },
];

const storeUser = useUserStore();
const { data } = storeToRefs(storeUser);

// Compatibilidade: naturalidade pode vir dentro de data.cliente.naturalidade
function readNaturalidade() {
  try {
    return (
      storeUser.data?.cliente?.naturalidade ||
      storeUser.data?.naturalidade ||
      ""
    );
  } catch (e) {
    return "";
  }
}
function writeNaturalidade(city, uf) {
  try {
    if (!storeUser.data) storeUser.data = {};
    if (!storeUser.data.cliente) storeUser.data.cliente = {};
    const parts = [];
    if (city && String(city).trim() !== "") parts.push(String(city).trim());
    if (uf && String(uf).trim() !== "") parts.push(String(uf).trim());
    storeUser.data.cliente.naturalidade = parts.join(", ");
  } catch (e) {
    /* noop */
  }
}

const naturalidadeCity = computed({
  get() {
    const parts = String(readNaturalidade() || "")
      .split(",")
      .map((s) => s.trim());
    return parts[0] || "";
  },
  set(v) {
    const uf = naturalidadeUf.value || "";
    writeNaturalidade(v, uf);
  },
});

const naturalidadeUf = computed({
  get() {
    const parts = String(readNaturalidade() || "")
      .split(",")
      .map((s) => s.trim());
    return parts[1] || "";
  },
  set(v) {
    const city = naturalidadeCity.value || "";
    writeNaturalidade(city, v);
  },
});

// Normalização removida: `setUserData()` é a fonte da verdade para estrutura dos dados do usuário.
</script>

<style scoped>
/* Seus estilos aqui */
</style>
