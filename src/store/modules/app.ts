import { VuexModule, Module, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface TAppState {
  name: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements TAppState{
  name = ''
}

export const AppModule = getModule(App)
