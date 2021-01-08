import { Context } from '@nuxt/types'
import { find } from 'lodash'

interface Redirect {
  paths: string[]
  redirect: string
}

interface Redirects {
  [key: string]: Redirect
}
// Product Categories
const productCategoryRedirects: Redirects = {
  waterControlStructures: {
    paths: [
      '/products/stormwater.php',
      '/products/water_control.php',
      '/products/drainage.php'
    ],
    redirect: '/products/water-control-structures'
  },
  crossingsCulvertsAndBS: {
    paths: ['/products/bottomless_structures.php'],
    redirect: '/products/crossings-culverts-and-bottomless-structures'
  },
  specialtyProducts: {
    paths: ['/products/finishingproducts.php'],
    redirect: '/products/specialty-products'
  },
  craftedClay: {
    paths: ['/products/masonry.php'],
    redirect: '/products/crafted-clay'
  }
}

// Products
const productRedirects: Redirects = {
  ultraFloPipe: {
    paths: ['/products/al_ultraflo.php'],
    redirect: '/products/pipe/ultra-flo-pipe'
  },
  aluminumStructuralPlate: {
    paths: [
      '/products/alsp1.php',
      '/products/alsp.php',
      '/products/bridge_alsp.php'
    ],
    redirect:
      '/products/crossings-culverts-and-bottomless-structures/aluminum-structural-plate'
  },
  antiseepCollars: {
    paths: ['/products/antiseep.php'],
    redirect: '/products/pipe/aluminum-anti-seep-collars'
  },
  avantiGrout: {
    paths: ['/products/avantigrout.php'],
    redirect: '/products/specialty-products/avanti-grout'
  },
  beboAndConspan: {
    paths: [
      '/products/bridge_precast.php',
      '/projects/bebo.php',
      '/products/precast.php'
    ],
    redirect:
      '/products/crossings-culverts-and-bottomless-structures/bebo-and-con-span-precast-structures'
  },
  steelTrussBridges: {
    paths: ['/products/bridge_truss.php', '/products/bridges.php'],
    redirect:
      '/products/crossings-culverts-and-bottomless-structures/steel-truss-bridges'
  },
  corrugatedAluminumPipe: {
    paths: ['/products/cap.php'],
    redirect: '/products/pipe/corrugated-aluminum-pipe'
  },
  chimneyPots: {
    paths: ['/products/chimneypot.php'],
    redirect: '/products/crafted-clay/chimney-pots'
  },
  concreteCloth: {
    paths: ['/products/concrete_cloth.php'],
    redirect: '/products/erosion-control/concrete-cloth'
  },
  detentionSystems: {
    paths: ['/products/detention.php'],
    redirect: '/products/detention-and-retention-systems/detention-systems'
  },
  flueLiners: {
    paths: ['/products/flueliners.php'],
    redirect: '/products/crafted-clay/flue-liners'
  },
  tritonMattresses: {
    paths: ['/products/geo-triton.php'],
    redirect: '/products/erosion-control/triton-mattresses'
  },
  fiberglassPipe: {
    paths: ['/products/hobaspipe.php'],
    redirect: '/products/pipe/fiberglass-pipe'
  },
  pizzaOvens: {
    paths: ['/products/masonry-ovens.php'],
    redirect: '/products/crafted-clay/pizza-ovens'
  },
  pondRiser: {
    paths: [
      '/products/pondriser-root.php',
      '/products/sw_pondriser.php',
      '/products/wc_pondriser.php'
    ],
    redirect: '/products/water-control-structures/pond-riser'
  },
  rumfordFireplaces: {
    paths: ['/products/rumford.php'],
    redirect: '/products/crafted-clay/rumford-fireplaces'
  },
  loganClayPipe: {
    paths: ['/products/sewer_pipe.php'],
    redirect: '/products/pipe/logan-clay-pipe'
  },
  flashboardRiser: {
    paths: [
      '/products/wc_flashboard_riser.php',
      '/projects/flashboard_riser.php'
    ],
    redirect: '/products/water-control-structures/flashboard-risers'
  },
  trashRack: {
    paths: [
      '/products/wc_trashrack.php',
      '/products/sw_trashracks.php',
      '/trashracklist.php'
    ],
    redirect: '/products/water-control-structures/trash-racks'
  },
  outletWeir: {
    paths: ['/products/wc_weir.php'],
    redirect: '/products/water-control-structures/outlet-weirs'
  },
  aluminumHeadwalls: {
    paths: ['/projects/headwalls.php'],
    redirect: '/products/headwall-systems/aluminum-headwalls'
  }
}

// Applications
const applicationRedirects: Redirects = {
  sliplining: {
    paths: ['/products/sliplining.php'],
    redirect: '/applications/slip-lining'
  },
  tunnels: {
    paths: ['/products/tunnels.php'],
    redirect: '/applications/tunnels'
  }
}

// Generic Pages
// Note: Projects on Old Website re-route to the Project Listing Page
export default function(context: Context) {
  const { route, redirect } = context
  const redirects: Redirects = {
    home: {
      paths: ['/index.php'],
      redirect: '/'
    },
    projects: {
      paths: [
        '/projects.php',
        '/project-list.php',
        '/projects/chapelhill_slipline.php',
        '/projects/dbl_barrel_culvert.php',
        '/projects/fayetteville_culvert.php',
        '/projects/harnettco_reline.php',
        '/projects/hunterafb_cc8.php',
        '/projects/mooreco_slipline.php',
        '/projects/ncdot_bridgecc.php',
        '/projects/orangeco_bridge.php',
        '/projects/shoreline.php',
        '/projects/trpl_barrel_culvert.php',
        '/projects/wakeco_culvert_rehab.php',
        '/projects/wilmington_slipline.php',
        '/projects/winston_undrgrnd-retention.php'
      ],
      redirect: '/projects'
    },
    products: {
      paths: [
        '/products.php',
        '/products/geo-synthetics.php',
        '/products/geo-tensar.php',
        '/products/geotextiles.php'
      ],
      redirect: '/products'
    },
    aboutUs: {
      paths: ['/aboutus.php', '/aboutus'],
      redirect: '/about-us'
    },
    contact: {
      paths: ['/contact', '/contact.php', '/contact.old.php'],
      redirect: '/about-us/contact'
    },
    team: {
      paths: ['/team'],
      redirect: '/about-us/team'
    },
    services: {
      paths: ['/services.php'],
      redirect: '/services'
    },
    ...productCategoryRedirects,
    ...productRedirects,
    ...applicationRedirects
  }
  const result = find(redirects, (redirect) =>
    redirect.paths.includes(route.path)
  )
  if (result) {
    return redirect(result.redirect)
  }
}
