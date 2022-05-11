import type { Slots } from 'vue'
import { defineComponent } from 'vue'
import { MenuItem, SubMenu } from 'ant-design-vue/es/menu'
import type { RouteRecordRaw } from 'vue-router'
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
    const menuSub = (router: RouteRecordRaw) => {
      const title = (router.meta?.title || router.name) as string
      const icon = router.meta?.icon || 'FolderOutlined'
      return (
        <SubMenu key={title}>{
          {
            title: () => [<span>{ title}</span>],
            icon: () => [<aIcon type={icon} />],
            default: () => [router.children && router.children.map(item => (
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              menuCreate(item)
            )),
            ],
          }
        }</SubMenu>
      )
    }

    const menuItem = (router: RouteRecordRaw) => {
      const itemSlots: Slots = {
        icon: () => router.meta?.icon ? [<aIcon type={router.meta?.icon || ''} />] : [],
      }
      return (
        <MenuItem v-slots={itemSlots} key={router.name}>

          <router-link to={router.path}>{router.meta?.title}</router-link>

        </MenuItem>
      )
    }

    const menuCreate = (router: RouteRecordRaw) => {
      if (router.children && router.children.length > 0 && !router.meta?.hidden)
        return menuSub(router)
      else if (!router.meta?.hidden)
        return menuItem(router)
    }

    return menuCreate(this.router as RouteRecordRaw)
  },
})
