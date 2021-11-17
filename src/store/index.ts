import Vue from 'vue'
import Vuex from 'vuex'
import { TAppState } from './modules/app'
import { TCartState } from './modules/cart'

Vue.use(Vuex)

export interface TRootState {
  app: TAppState;
  cart: TCartState;
}

export default new Vuex.Store<TRootState>({})
