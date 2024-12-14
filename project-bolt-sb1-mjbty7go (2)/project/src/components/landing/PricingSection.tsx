import React from 'react';
import { Sparkles, Check, Clock } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      '10 queries per day',
      'Basic code examples',
      'Community support'
    ],
    isPopular: false,
    buttonText: 'Get Started',
    isComingSoon: false
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'Best for professional developers',
    features: [
      'Unlimited queries',
      'Advanced code examples',
      'Priority support',
      'Custom language settings',
      'API access'
    ],
    isPopular: true,
    buttonText: 'Coming Soon',
    isComingSoon: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom integrations',
      'Advanced analytics',
      'Dedicated support'
    ],
    isPopular: false,
    buttonText: 'Coming Soon',
    isComingSoon: true
  }
];

export function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your development needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg border ${
                plan.isPopular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <button
                  disabled={plan.isComingSoon}
                  className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold 
                    ${
                      plan.isComingSoon
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  {plan.isComingSoon ? (
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      {plan.buttonText}
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}