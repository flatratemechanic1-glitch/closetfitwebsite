import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  monthlyPrice: number;
  description: string;
  features: PlanFeature[];
  isPopular: boolean;
  ctaText: string;
  ctaHref: string;
}

interface Props {
  plans: Plan[];
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10l3.5 3.5L15 7" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 10h8" />
    </svg>
  );
}

function getPrice(monthlyPrice: number, isAnnual: boolean): string {
  if (monthlyPrice === 0) return 'Free';
  if (isAnnual) {
    const annualMonthly = monthlyPrice * 0.8;
    return `$${annualMonthly.toFixed(2)}`;
  }
  return `$${monthlyPrice.toFixed(2)}`;
}

function PlanCard({
  plan,
  isAnnual,
  index,
  animated,
}: {
  plan: Plan;
  isAnnual: boolean;
  index: number;
  animated: boolean;
}) {
  const price = getPrice(plan.monthlyPrice, isAnnual);

  const card = (
    <div
      className={`relative rounded-2xl p-8 h-full flex flex-col ${
        plan.isPopular
          ? 'glass-strong border-2 border-coral shadow-glow-coral'
          : 'glass'
      } ${plan.isPopular ? 'order-first md:order-none' : ''}`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-bg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
          Most Popular
        </div>
      )}

      <h3 className="text-2xl font-display font-bold text-text-primary">
        {plan.name}
      </h3>
      <p className="text-text-secondary text-sm mt-1">{plan.description}</p>

      <div className="mt-6 mb-1">
        <div className="flex items-baseline gap-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${plan.name}-${isAnnual ? 'annual' : 'monthly'}`}
              initial={animated ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animated ? { opacity: 0, y: 10 } : undefined}
              transition={{ duration: 0.2 }}
              className="text-4xl font-display font-bold text-text-primary"
            >
              {price}
            </motion.span>
          </AnimatePresence>
          {plan.monthlyPrice > 0 && (
            <span className="text-text-muted text-sm">/month</span>
          )}
        </div>
        {plan.monthlyPrice > 0 && isAnnual && (
          <p className="text-text-muted text-xs mt-1">
            Billed ${(plan.monthlyPrice * 12 * 0.8).toFixed(2)}/year
          </p>
        )}
      </div>

      <ul className="space-y-3 my-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-3 text-sm">
            {feature.included ? <CheckIcon /> : <DashIcon />}
            <span
              className={
                feature.included ? 'text-text-secondary' : 'text-text-muted'
              }
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaHref}
        className={`block w-full text-center px-6 py-3 font-bold rounded-xl transition-all duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 ${
          plan.isPopular
            ? 'bg-coral text-bg hover:bg-coral-light hover:-translate-y-0.5 hover:shadow-glow-coral focus-visible:outline-coral'
            : plan.monthlyPrice === 0
              ? 'border border-champagne text-champagne hover:bg-champagne/10 focus-visible:outline-champagne'
              : 'bg-champagne text-bg hover:bg-champagne-light hover:-translate-y-0.5 hover:shadow-glow-champagne focus-visible:outline-champagne'
        }`}
      >
        {plan.ctaText}
      </a>
    </div>
  );

  if (!animated) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      className="h-full"
    >
      {card}
    </motion.div>
  );
}

export default function PricingToggle({ plans }: Props) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            isAnnual={false}
            index={i}
            animated={false}
          />
        ))}
      </div>
    );
  }

  const animated = !reducedMotion;

  return (
    <div>
      {/* Monthly / Annual toggle */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span
          className={`text-sm font-medium transition-colors duration-200 ${
            !isAnnual ? 'text-text-primary' : 'text-text-muted'
          }`}
        >
          Monthly
        </span>
        <button
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle annual billing"
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative w-14 h-8 rounded-full glass-strong transition-colors duration-300 cursor-pointer"
        >
          <span
            className={`absolute top-1 w-6 h-6 rounded-full bg-champagne transition-transform duration-300 ${
              isAnnual ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors duration-200 ${
            isAnnual ? 'text-text-primary' : 'text-text-muted'
          }`}
        >
          Annual
        </span>
        {isAnnual && (
          <span className="ml-1 px-2 py-0.5 text-[10px] uppercase tracking-wider text-coral bg-coral/10 rounded-full font-bold">
            Save 20%
          </span>
        )}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            isAnnual={isAnnual}
            index={i}
            animated={animated}
          />
        ))}
      </div>
    </div>
  );
}
