import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/hooks';
import { featureIconMap } from '@/components/icons/FeatureIcons';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

interface Feature {
  title: string;
  description: string;
  iconKey: string;
  isAI: boolean;
}

interface Props {
  features: Feature[];
}

function FeatureIcon({ iconKey, isAI }: { iconKey: string; isAI: boolean }) {
  const Icon = featureIconMap[iconKey];
  return (
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center glass ${
        isAI ? 'text-lavender' : 'text-champagne'
      }`}
    >
      {Icon ? <Icon className="w-6 h-6" /> : null}
    </div>
  );
}

function StaticCards({ features }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div
          key={feature.title}
          className={`card-tracer glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
            feature.isAI
              ? 'border-l-2 border-l-lavender hover:shadow-glow-lavender'
              : 'hover:shadow-glow-champagne'
          }`}
        >
          <FeatureIcon iconKey={feature.iconKey} isAI={feature.isAI} />
          <h3 className="font-display font-semibold text-text-primary text-lg mt-4 mb-2">
            {feature.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>
          {feature.isAI && (
            <span className="inline-block mt-3 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lavender bg-lavender/10 rounded-full font-semibold">
              AI Powered
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FeatureCards({ features }: Props) {
  const { mounted, reducedMotion } = useReducedMotion();

  if (!mounted || reducedMotion) {
    return <StaticCards features={features} />;
  }

  return (
    <ErrorBoundary fallback={<StaticCards features={features} />}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
          className={`card-tracer glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
            feature.isAI
              ? 'border-l-2 border-l-lavender hover:shadow-glow-lavender'
              : 'hover:shadow-glow-champagne'
          }`}
        >
          <FeatureIcon iconKey={feature.iconKey} isAI={feature.isAI} />
          <h3 className="font-display font-semibold text-text-primary text-lg mt-4 mb-2">
            {feature.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>
          {feature.isAI && (
            <span className="inline-block mt-3 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lavender bg-lavender/10 rounded-full font-semibold">
              AI Powered
            </span>
          )}
        </motion.div>
      ))}
    </div>
    </ErrorBoundary>
  );
}
