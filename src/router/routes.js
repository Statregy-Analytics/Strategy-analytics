const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    //lading-page
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "simulator",
        name: "simulator",
        component: () => import("pages/SimulatorPage.vue"),
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("pages/ContactForm.vue"),
      },
      {
        path: "perspective",
        name: "perspective",
        component: () => import("pages/PerspectivePage.vue"),
      },
      {
        path: "quemsomos",
        name: "quemsomos",
        component: () => import("pages/WhoWeAre.vue"),
      },
      {
        path: "nossaequipe",
        name: "nossaequipe",
        component: () => import("pages/OurTeamPage.vue"),
      },
      {
        path: "investimentos",
        name: "investimentos",
        component: () => import("pages/ManagementPage.vue"),
      },
      {
        path: "quadrivium",
        name: "quadrivium",
        component: () => import("pages/QuadriviumPage.vue"),
      },
      {
        path: "rendavariavel",
        name: "rendavariavel",
        component: () => import("pages/VariableincomePage.vue"),
      },
      {
        path: "rendafixa",
        name: "rendafixa",
        component: () => import("pages/SecurityincomePage.vue"),
      },
      {
        path: "rendaflexivel",
        name: "rendaflexivel",
        component: () => import("pages/FlexibleincomePage.vue"),
      },
    ],
  },
  //system
  {
    path: "/login",
    name: "login",
    component: () => import("../system/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../system/pages/RegisterPage.vue"),
  },
  {
    path: "/system/",
    component: () => import("../system/layouts/MainLayout.vue"),
    props: true,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "not-found",
        name: "not-found",
        component: () => import("../system/pages/NotFoundSystem.vue"),
      },
      {
        path: "confirm-email",
        name: "Confirma e-mail",
        component: () => import('../system/pages/ConfirmEmailPage.vue')
      },
      {
        path: "dashboard",
        component: () => import("../system/views/WalletView.vue"),
        props: true,
        children: [
          {
            path: "",
            name: "inicio",
            component: () => import("../system/pages/WalletPage.vue"),
            props: true,
          },
          {
            path: "deposit",
            name: "deposit",
            component: () => import("../system/pages/DepositPage.vue"),
            props: true,
          }
        ]
      },
      {
        path: "perfomance",
        name: "perfomance",
        component: () => import("../system/pages/PerfomancePage.vue"),
      },
      {
        path: "config",
        name: "config",
        component: () => import("../system/pages/ConfigPage.vue"),
      },
      // {
      //   name: "calendar",
      //   path: "calendar",
      //   component: () => import("../system/pages/CalendarPage.vue"),
      // },
      {
        path: "loan",
        name: "loan",
        component: () => import("../system/pages/LoanPage.vue"),
      },
      {
        path: "report",
        name: "report",
        component: () => import("../system/pages/ReportPage.vue"),
      },
      {
        path: "graphic",
        name: "graphic",

        component: () => import("../system/pages/GraphicPage.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("../system/pages/UsersPage.vue"),
        meta: {
          allowedTypes: [1],
        },
      },
      {
        path: "clients",
        name: "clients",
        component: () => import("../system/pages/ClientsPage.vue"),
        meta: {
          allowedTypes: [1],
        },
      },
      {
        path: "controlDeposit",
        component: () => import("../system/views/DepositView.vue"),
        props: true,
        meta: {
          allowedTypes: [1],
        },
        children: [
          {
            path: "",
            name: "controlDeposit",
            component: () => import("../system/pages/control/ControlDepositPage.vue"),
            props: true,
          },

        ]
      },
      {
        path: "controlReports",
        component: () => import("../system/views/ReportView.vue"),
        props: true,
        meta: {
          allowedTypes: [1],
        },
        children: [
          {
            path: "",
            name: "controlReports",
            component: () => import("../system/pages/ControlreportPage.vue"),
            props: true,
          },
          {
            path: ":id",
            name: "relatorio",
            component: () => import("../system/layouts/control/reports/ReadreportLayout.vue"),
            meta: {
              allowedTypes: [1],
            },
            props: true
          }
        ]
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
