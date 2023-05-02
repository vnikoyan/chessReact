export const RouteNames = {
  business: {
    login: "/login",
    signup: "/sign-up",
    setUpProfile: "/set-up-profile",
    resetPassword: "/reset-password",
    home: "/home",
    products: "/products",
    orders: "/orders",
    profile: "/profile",
  },
  customer: {
    explore: "/explore",
    cart: "/cart",
    orders: "/orders",
    winery: (id = ":id") => `/winery/${id}`,
    settings: "/settings",
  },
  other: {
    applePay: "/well-known/apple-developer-merchantid-domain-association",
  },
};
