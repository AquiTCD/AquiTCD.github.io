const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"
module.exports = {
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  mode: 'spa',
  generate: {
    dir: 'docs'
  },
  head: {
    title: "The Portfolio of Aqui.TCD",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
        crossorigin: "anonymous"
      }
    ]
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  css: ['ress',"~/assets/styles/main.sass"],
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: ['json-loader', 'yaml-loader']
      })
    }
  },
  modules: [
    "@nuxtjs/axios",
    "~/modules/typescript.js",
    ['nuxt-sass-resources-loader']
  ],
  sassResources: [
    '~/assets/styles/_config.sass'
  ],
  axios: {}
}
