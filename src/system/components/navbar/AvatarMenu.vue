<template>
  <div class="AvatarMenu row items-center">
    <!-- Avatar que leva às configurações -->
    <q-btn round :to="{ name: 'config' }" size="40px" unelevated>
      <q-avatar class="q-my-sm avatar-custom">
        <template v-if="avatar && avatar.length">
          <img :src="avatar" />
        </template>
        <template v-else>
          <div class="avatar-initials">{{ initials }}</div>
        </template>
      </q-avatar>
    </q-btn>

    <!-- Botão de logout visível -->
    <q-btn
      flat
      dense
      color="white"
      class="q-ml-sm"
      @click.prevent="handleLogout"
      title="Sair do sistema"
    >
      <q-icon name="logout" />
      <span class="q-ml-xs text-white">Sair</span>
    </q-btn>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import useClientAuth from "src/composables/system/useClientAuth";
import { Cookies } from "quasar";

export default defineComponent({
  name: "AvatarMenu",
  props: {
    avatar: { type: String },
  },
  setup(props) {
    const { logout } = useClientAuth();

    const initials = computed(() => {
      // if avatar provided, no initials needed
      if (props.avatar) return "";
      try {
        const userRaw = Cookies.get(process.env.COOKIE_USER_DATA || "SA_user");
        if (!userRaw) return "";
        const user =
          typeof userRaw === "string" ? JSON.parse(userRaw) : userRaw;
        const name = user.name || user.nome || "";
        if (!name) return "";
        const parts = name.trim().split(/\s+/);
        const first = parts[0] ? parts[0].charAt(0) : "";
        const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
        return (first + last).toUpperCase();
      } catch (e) {
        return "";
      }
    });

    const handleLogout = () => {
      // chama logout do composable de cliente e retorna à página inicial
      console.log("AvatarMenu.handleLogout - clicado");
      try {
        logout();
        console.log("AvatarMenu.handleLogout - logout() chamado");
      } catch (e) {
        console.error("AvatarMenu.handleLogout - Erro no logout:", e);
        // Garantir que o cookie local seja removido mesmo em erro
        Cookies.remove(process.env.COOKIE_TOKEN_NAME || "SA_token");
        Cookies.remove(process.env.COOKIE_USER_DATA || "SA_user");
        // redireciona para home (fallback)
        try {
          window.location.replace("/");
        } catch (err) {
          window.location.href = "/";
        }
      }
    };

    return {
      handleLogout,
      initials,
    };
  },
});
</script>
<style lang="sass">
.avatar-custom>.q-avatar__content>img
  border: 2px solid #ddd

.avatar-initials
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  font-weight: 700
  color: #ffffff
  background: #2a9df4
  border-radius: 50%
  font-size: 1rem
</style>
