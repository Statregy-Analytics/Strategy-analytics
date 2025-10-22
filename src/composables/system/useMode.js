import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import { ref } from 'vue'
export default function useMode() {

  const clientNavList = [
    {
      toName: { name: "inicio" },
      name: "Home",
      inative: false,
      icon: 'IconHome'
    },
    {
      // toName: { name: "perfomance" },
      toName: { name: "Contratos" },
      name: "Contratos",
      inative: false,
      icon: 'IconFileDollar'
    },
    {
      // toName: { name: "graphic" },
      toName: { name: "Comunicação" },
      name: "Comunicação",
      inative: false,
      icon: "IconSpeakerphone"
    },
    {
      // toName: { name: "calendar" },
      toName: { name: "Alavancagem" },
      name: "Alavancagem",
      inative: false,
      icon: 'IconReceipt2'
    }
  ]


  return {
    // isMenuList,
    clientNavList,
  };
}
