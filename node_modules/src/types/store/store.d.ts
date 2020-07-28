import React from 'react'
import 'reactn'

interface storeCart {
  products: any
}

interface storeUser {
  isDefined: boolean
  isLogin: boolean
  isAdmin: boolean
  email: string
}

type storeAlertPopup = null | {
  type?: 'warn' | 'error' | 'info'
  inner: React.ReactElement | string
}

declare module 'reactn/default' {
  export interface State {
    storeCart: storeCart
    storeUser: storeUser
    storeArticles10: Articles
    storeProducts10: Products
    globalCategories: any
    storeAlertPopup: storeAlertPopup
  }

  type STORE_CART_EL = (global: State, dispatch: any, productId: number, variantKey: number) => any

  export interface Reducers {
    STORE_CART_ADD: STORE_CART_EL
    STORE_CART_REMOVE: STORE_CART_EL
    STORE_LOAD_USER_SESSION: (global: State, dispatch: any) => any
    STORE_SET_USER: (global: State, dispatch: any, storeUser: { isAdmin?: boolean; email?: string }) => any
    STORE_CLOSE_USER_SESSION: (global: State, dispatch: any) => any
    STORE_SET_ALERT_POPUP: (global: State, dispatch: any, storeAlertPopup: storeAlertPopup) => any
    STORE_INIT: () => Pick<State, 'Articles'>
  }
}
