<template>
  <q-form
    @submit.prevent.stop="onSubmit"
    class="column justify-center LoginLayout"
  >
    <div class="row justify-center text-white">
      <div class="col-md-3 col-sm-8 self-center">
        <div class="column">
          <div class="row">
            <div class="col-8 col-md-12">
              <span class="text-muted-register">
                Ainda não é membro da Strategy?
                <b
                  class="text-hover text-weight-bolder forgot text-white"
                  @click="goRegister"
                >
                  Crie sua conta aqui!.
                </b>
              </span>
            </div>
          </div>
        </div>
        <div class="column q-mt-lg">
          <span class="text-label q-mt-lg">CPF ou CNPJ</span>
          <q-input
            v-bind="{ ...$inputStyle }"
            v-model="login.person"
            mask="###.###.###-##"
            placeholder="000.000.000-00 | 000.000.000/0001-00"
            :rules="personRule"
            ref="personRef"
          />

          <span class="text-label q-mt-lg">Confirmar Senha</span>
          <q-input
            v-model="login.password"
            v-bind="{ ...$inputStyle }"
            :type="isPwd ? 'password' : 'text'"
            :rules="[(val) => !!val || 'Campo obrigatório']"
            ref="passwordRef"
            placeholder="Confirme sua senha"
          >
            <template v-slot:append>
              <q-icon
                color="secondary"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <p
            class="text-hover text-weight-bolder forgot q-my-lg"
            @click="forgot"
          >
            Esqueci minha senha.
          </p>

          <!-- <div class="row"> -->
          <q-btn
            color="primary"
            text-color="white"
            label="Continuar"
            type="submit"
            :disabled="loading"
            :loading="loading"
            class="text-weight-bolder col-8 col-md-12 q-pa-md"
            no-caps
            style="border-radius: 8px"
          />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </q-form>
  <q-inner-loading
    :showing="loading"
    label="Por favor, aguarde..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
    dark
  />
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useUserStore } from "../../../stores/user";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
// import useLogin from "../../composables/useLogin";
import useClientAuth from "../../../composables/system/useClientAuth";
import useRoles from "../../../composables/system/useRoles";
// import HeaderAuth from "src/system/components/auth/HeaderAuth.vue";
import RegisterData from "src/system/components/RegisterData.vue";

export default defineComponent({
  name: "LoginLayout",
  components: {
    // HeaderAuth,
  },
  emits: ["status-login"],
  setup(props, ctx) {
    const useStore = useUserStore();
    const personRef = ref(null);
    const passwordRef = ref(null);
    // const { auth, errors, loading } = useAuth();
    const { authenticateClient, loading } = useClientAuth();
    const { personRule } = useRoles();
    // const isValidperson = computed(() => errors.person.length > 0);
    const { login } = storeToRefs(useStore);
    const route = useRoute();
    const router = useRouter();
    const onSubmit = async () => {
      personRef.value.validate();
      passwordRef.value.validate();
      if (!personRef.value.hasError && !passwordRef.value.hasError) {
        const credentials = {
          cpf: login.value.person,
          password: login.value.password,
        };
        await authenticateClient(credentials);
      }
    };
    const goRegister = () => {
      router.replace({ name: "register" });
    };
    const forgot = () => {
      ctx.emit("status-login", "ForgotPassword");
    };
    const isPwd = ref(true);
    onMounted(() => {});
    return {
      personRef,
      passwordRef,
      loading,
      login,
      isPwd,
      personRule,
      onSubmit,
      forgot,
      goRegister,
    };
  },
  // Outras configurações do componente aqui
});
</script>

<style lang="sass" scoped></style>
