export const revalidate = 86400

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Delivery Policy',
  description: 'How our 10-minute delivery works — zones, rates, and what to expect.',
}

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Last updated: May 2026</p>
        <h1 className="text-3xl font-bold text-gray-900">Delivery Policy</h1>
        <p className="text-gray-600 mt-3">HighStreetExpress delivers in 10 minutes. Here's everything you need to know.</p>
      </div>

      <div className="space-y-8 text-gray-700">
        <section>
          <div className="bg-black text-white rounded-xl p-5 text-center">
            <p className="text-2xl font-bold">⚡ 10-Minute Delivery</p>
            <p className="text-sm text-gray-300 mt-1">Order placed → rider dispatched → at your door in 10 minutes</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Free Delivery</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 font-medium">
            🎉 Free delivery on all orders above £20
          </div>
          <p className="mt-3">Orders below £20 are charged a flat delivery fee of £2.99.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Place your order — confirm your delivery address and pay.</li>
            <li>A rider is dispatched from our nearest fulfilment point within seconds.</li>
            <li>Your order arrives at your door in <strong>10 minutes</strong>.</li>
            <li>You'll receive a real-time notification as your rider heads to you.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Areas</h2>
          <p>We currently operate in select postcodes across the UK. Enter your postcode at checkout to confirm availability. We are expanding to new areas rapidly — check back soon!</p>
          <p className="text-sm text-gray-500 mt-2">Delivery is only available within active service zones. Orders outside covered postcodes cannot be fulfilled.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Operating Hours</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Day</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Hours (GMT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3">Monday – Friday</td>
                  <td className="px-4 py-3 font-medium">9:00 AM – 9:00 PM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Saturday</td>
                  <td className="px-4 py-3 font-medium">10:00 AM – 8:00 PM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Sunday</td>
                  <td className="px-4 py-3 font-medium">10:00 AM – 6:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">Orders placed outside operating hours will be delivered first thing the next operating day.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Tracking Your Order</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>You'll receive an SMS/email notification when your rider is dispatched.</li>
            <li>Log in and visit <Link href="/account/orders" className="text-black underline underline-offset-2">My Orders</Link> to see live status updates.</li>
            <li>Ask our <Link href="/contact" className="text-black underline underline-offset-2">support chat</Link> for instant order status.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Missed Delivery</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Our rider will contact you upon arrival. Please be available at your delivery address.</li>
            <li>If you cannot be reached, the rider will wait briefly before returning the order.</li>
            <li>We'll arrange a re-delivery or issue a full refund — whichever you prefer.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Damaged or Wrong Item</h2>
          <p>If your order arrives damaged or incorrect, please <Link href="/contact" className="text-black underline underline-offset-2">contact us within 48 hours</Link> with photos. We'll arrange a replacement or full refund at no cost to you.</p>
        </section>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-sm text-gray-500">Questions about your delivery? <Link href="/contact" className="text-black underline underline-offset-2">Chat with our support team</Link> — we respond within 4 hours.</p>
        </div>
      </div>
    </div>
  )
}
