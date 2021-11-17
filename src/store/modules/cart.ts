import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'

export interface TCartState {
  list: TCartData[];
}

@Module({ dynamic: true, store, name: 'cart' })
class Cart extends VuexModule implements TCartState {
  public list = JSON.parse(localStorage.getItem('cart') || '[]')

  public get getList () {
    return this.list
  }

  public get totalCount () {
    return this.list.reduce((total: number, curr: TCartData) => total + curr.count, 0)
  }

  public get totalPrice () {
    return this.list.reduce((total: number, curr: TCartData) => total + curr.price * curr.count, 0)
  }

  public get checkedCodes () {
    return this.list.filter((item: TCartData) => item.checked).map((item: TCartData) => item.code)
  }

  @Mutation
  private SET_LIST (list: TCartData[]) {
    this.list = list
    localStorage.setItem('cart', JSON.stringify(this.list))
  }

  @Mutation
  private CLEAR_CART () {
    this.list = []
    localStorage.removeItem('cart')
  }

  @Action
  public increase (shop: TProductList) {
    const list = [...this.list]
    const target = list.find((item: TCartData) => shop.code === item.code)
    if (target) {
      target.count++
      target.checked = true
    } else {
      list.push({ ...shop, count: 1 })
    }
    this.persistenceData(list)
  }

  @Action
  public decrease (shop: TProductList) {
    const list = [...this.list]
    const target = list.find((item: TCartData) => shop.code === item.code)
    if (target && target.count > 1) {
      target.count--
    } else {
      list.splice(this.list.findIndex((item: TCartData) => shop.code === item.code), 1)
    }
    this.persistenceData(list)
  }

  @Action
  private persistenceData (list: TCartData[]) {
    if (list.length > 0) {
      this.SET_LIST(list)
    } else {
      this.CLEAR_CART()
    }
  }
}

export const CartModule = getModule(Cart)
