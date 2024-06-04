'use client';
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import PricingHeader from '../components/pricingComponent/pricingHeader';
import Footer from '../components/mainPage/footer';
import Hero from '../components/pricingComponent/hero';
import Info from '../components/pricingComponent/info';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import getStripe from '../utils/getStripe';

const pricingPlans = [
  {
    title: '5 Credits',
    price: '$5',
    credits: 5,
    buttonText: 'Buy Now',
    paymentLink: 'https://buy.stripe.com/test_9AQ3dC5C96dq168eUW',
  },
  {
    title: '10 Credits',
    price: '$9',
    credits: 10,
    buttonText: 'Buy Now',
    paymentLink: 'https://buy.stripe.com/test_4gw6pO1lT6dqg1228b',
  },
  {
    title: '20 Credits',
    price: '$17',
    credits: 20,
    buttonText: 'Buy Now',
    paymentLink: 'https://buy.stripe.com/test_8wM15u3u131edSUdQU',
  },
  {
    title: '50 Credits',
    price: '$40',
    credits: 50,
    buttonText: 'Buy Now',
    paymentLink: 'https://buy.stripe.com/test_9AQ5lK6Gd45i7uwcMR',
  },
];

const Pricing = () => {

  const router = useRouter();

  const handlePurchase = async (credits: number) => {
     await axios.post('/api/testApi', { credits }).then((res: any) => {
      console.log(res?.data?.url)
      if(res.status === 201) {
        router.push(res?.data?.url)
      }
    });
  };

  

  return (
    <div>
      
      <PricingHeader />
      
      <Hero />
      <main className="w-full px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Choose a credit package</h2>
          <p className="text-gray-600 mt-4">Get more credits to unlock additional features.</p>
        </div>
        <div className="flex justify-center items-center gap-3  ">
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              className="w-full md:w-1/3    mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-lg shadow-zinc-900 p-8">
                <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <ul className="mb-6">
                  <li className="mb-2 text-gray-600">
                    <span className="mr-2">✓</span>
                    {plan.credits} Credits
                  </li>
                </ul>
                <button onClick={() => handlePurchase(plan.credits)}
                  className=" bg-gradient-to-tl from-slate-950 via-teal-800 to-slate-950 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Info />
      <Footer />
    </div>
  );
};

export default Pricing;
