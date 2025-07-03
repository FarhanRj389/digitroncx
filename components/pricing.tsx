"use client"

import { Button } from "@/components/ui/button"
import { Check, Link, Star } from "lucide-react"

const pricingPlans = [
  {
    name: "Startup Branding",
    price: "$150",
    currency: "NZD",
    description: "Perfect for new businesses and startups",
    features: [
      "Logo Design (3 concepts)",
      "Business Card Design",
      "Letterhead Design",
      "Social Media Kit",
      "Brand Guidelines",
      "2 Revisions Included",
      "High-Resolution Files",
      "7-Day Delivery",
    ],
    popular: true,
    cta: "Start Branding",
  },
  {
    name: "Website Essentials",
    price: "$500",
    currency: "NZD",
    description: "Professional website for small businesses",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "SEO Optimization",
      "Contact Form",
      "Google Analytics",
      "Social Media Integration",
      "3 Months Support",
      "Content Management System",
    ],
    popular: false,
    cta: "Get Website",
  },
  {
    name: "Complete Digital Package",
    price: "$1,500",
    currency: "NZD",
    description: "Everything you need for digital success",
    features: [
      "Complete Branding Package",
      "Professional Website (10 pages)",
      "Mobile App (Basic)",
      "SEO Setup",
      "Social Media Strategy",
      "Email Marketing Setup",
      "6 Months Support",
      "Training & Documentation",
    ],
    popular: false,
    cta: "Go Digital",
  },
]

export default function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Affordable Service Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent pricing with no hidden costs. Choose the package that best fits your business needs and budget.
            All prices in New Zealand Dollars.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? "ring-4 ring-blue-100 border-2 border-blue-500" : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-lg text-gray-600 ml-2">{plan.currency}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
              <Button
                className={`w-full py-3 text-lg font-medium ${
                  plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.cta}
              </Button>
              </Link> 
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg">
            <span className="text-gray-700 font-medium">💰 Special Offer: 20% off for first-time clients</span>
          </div>
        </div> */}
      </div>
    </section>
  )
}
