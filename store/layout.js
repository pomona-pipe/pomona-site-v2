export const state = () => ({
  mobileDrawer: false,
  navLinks: [{
    repeat: [{
        sub_nav_link_label: {
          type: "StructuredText",
          value: [{
            type: "paragraph",
            text: "Bridges & Structures",
            spans: []
          }]
        },
        sub_nav_link: {
          type: "Link.document",
          value: {
            document: {
              id: "XrmovRAAAPuZs9HK",
              type: "product_categories",
              tags: [],
              lang: "en-us",
              slug: "bridges--structures",
              uid: "bridges-and-structures"
            },
            isBroken: false
          }
        }
      }

    ],
    "non-repeat": {
      label: {
        value: [{
          type: "paragraph",
          text: "Products",
          spans: [ ]
        }]
      },
      link: {
        type: "Link.document",
        value: {
          document: {
            id: "XsLLnxAAAMq025VU",
            type: "category_page",
            tags: [],
            lang: "en-us",
            slug: "product-categories",
            uid: "products",
          },
          isBroken: false
        }
      }
    }
  }],
})

export const mutations = {
  toggleMobileDrawer(state) {
    state.mobileDrawer = !state.mobileDrawer
  },
}
