import type { Slots } from 'vue'
import { defineComponent } from 'vue'
import { MenuItem, SubMenu } from 'ant-design-vue/es/menu'
import type { RouterObj } from '@/types/api/login'
import aIcon from '@/components/aicon/aicon.vue'
export default defineComponent({
  components: {
    AIcon: aIcon,
  },
  props: {
    router: {
      type: Object,
      required: true,
    },
  },
  render() {
    const menuSub = (router: RouterObj) => {
      return (
        <SubMenu key={router.key}>{
          {
            title: () => [<span>{router.name}</span>],
            icon: () => [<aIcon type={router.icon || 'FolderOutlined'} />],
            default: () => [router.children && router.children.map(item => (
              menuCreate(item)
            )),
            ],
          }
        }</SubMenu>
      )
    }

    const menuItem = (router: RouterObj) => {
      const itemSlots: Slots = {
        icon: () => router.icon ? [<aIcon type={router.icon || ''} />] : [],
      }
      return (
        <MenuItem v-slots={itemSlots} key={router.key}>

          <router-link to={router.path}>{router.name}</router-link>

        </MenuItem>
      )
    }

    const menuCreate = (router: RouterObj) => {
      if (router.children && !router.hidden)
        return menuSub(router)
      else if (!router.hidden)
        return menuItem(router)
    }

    return menuCreate(this.router as RouterObj)
  },
})
