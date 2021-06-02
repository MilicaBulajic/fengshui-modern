import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.PUBLIC_STRIPE_KEY)
  }
  return stripePromise
}

export default getStripe
