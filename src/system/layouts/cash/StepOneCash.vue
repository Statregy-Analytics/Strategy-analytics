<template>
  <div class="row justify-center">
    <div class="col-5 q-px-md row justify-center">
      <div class="col-auto badge-warning q-my-md row items-center">
        <IconInfoCircle class="text-warning" />
        <span class="text-inter-14-500">
          Realizar o saque de valores reduz os saldos da sua Carteira na
          plataforma.
        </span>
      </div>
    </div>

    <div class="col-12"></div>
    <q-card class="step-one-cash tool col-5">
      <div class="row items-center">
        <div class="col-12 row items-center">
          <q-btn
            class="btn-pattern-transparent q-mr-md"
            flat
            no-caps
            padding="6px"
          >
            <IconArrowUp class="text-white" />
          </q-btn>
          <span class="text-h7 text-weight-bolder"> Saque </span>
        </div>
      </div>
      <div class="row q-my-lg">
        <div class="col-12">
          <label-form textLabel="Conta Bancária de Destino">
            <q-select
              transition-show="flip-up"
              transition-hide="flip-down"
              outlined
              dense
              v-model="cash.account"
              :options="getOptionsAccount"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <!-- <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section> -->
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{
                      scope.opt.description
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </label-form>
        </div>
        <div class="col-12 q-my-lg">
          <label-form textLabel="Valor do Saque (R$)">
            <q-input
              v-model="cash.ammount"
              outlined
              dense
              hint="Saldo Disponível para Saque: R$ 100,00"
            />
          </label-form>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          no-caps
          label="Continuar"
          @click.prevent="stepCash = 2"
        >
          <IconArrowRight />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent, computed, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import LabelForm from "src/system/components/form/LabelForm.vue";

defineComponent({
  name: "StepOneCash",
});
const storeUser = useUserStore();
const { getOptionsAccount, cash, stepCash } = storeToRefs(storeUser);

// Seu código aqui
</script>

<style scoped>
/* Seus estilos aqui */
</style>
