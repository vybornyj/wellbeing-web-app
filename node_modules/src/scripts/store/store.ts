import { Reducers, State } from 'reactn/default'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

export const INITIAL_STATE: State = {
  storeCart: {
    products: []
  },
  // USER DATA
  storeUser: {
    isDefined: false,
    isLogin: false,
    isAdmin: false,
    email: ''
  },
  // APP DATA
  storeArticles10: [],
  storeProducts10: [],
  globalCategories: [],
  // TEMPLATE DATA
  storeAlertPopup: null
}

// const REDUCER = (globalState, reducers, globalStateProp) => ({ globalStateProp })
const STORE_CART_ADD: Reducers['STORE_CART_ADD'] = async (globalState, __, productId, variantKey) => {
  return {
    storeCart: {
      products: [...globalState.storeCart.products, { productId, variantKey }]
    }
  }
}

const STORE_CART_REMOVE: Reducers['STORE_CART_REMOVE'] = async (globalState, __, productId, variantKey) => {
  let cartProducts = globalState.storeCart.products

  const isInCart = obj => !(obj.productId === productId && obj.variantKey === variantKey)

  cartProducts = cartProducts.filter(isInCart)

  return {
    storeCart: {
      products: [...cartProducts]
    }
  }
}

const STORE_LOAD_USER_SESSION = async (_, __) => {
  const { email, isAdmin } = await apiRequestClient(`/api/session/load`)
  return {
    storeUser: {
      isDefined: true,
      isLogin: !!email,
      isAdmin: !!isAdmin,
      email: email ?? ''
    }
  }
}

const STORE_SET_USER = (_, __, storeUser) => {
  const { isAdmin, email } = storeUser ?? {}
  return {
    storeUser: {
      isDefined: true,
      isLogin: !!email,
      isAdmin: !!isAdmin,
      email: email ?? ''
    }
  }
}

const STORE_CLOSE_USER_SESSION = async (_, __) => {
  await apiRequestClient('/api/session/close')

  return {
    storeUser: {
      isDefined: true,
      isLogin: false,
      isAdmin: false,
      email: ''
    }
  }
}

const STORE_INIT = async globalState => {
  if (!globalState.storeArticles10.length || !globalState.storeArticles10.length) {
    const { articles, products } = await apiRequestClient(`/api/init`)
    return {
      storeArticles10: articles,
      storeProducts10: products
    }
  } else {
    return {}
  }
}

const STORE_SET_ALERT_POPUP = (_, __, storeAlertPopup) => ({ storeAlertPopup })

export const INITIAL_REDUCERS = {
  STORE_CART_ADD,
  STORE_CART_REMOVE,

  STORE_SET_USER,
  STORE_LOAD_USER_SESSION,
  STORE_CLOSE_USER_SESSION,

  STORE_INIT,

  STORE_SET_ALERT_POPUP
}
