import { FEATURES_DATA } from "../../utils/data";

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-35">
      <div className="mb-20 text-center space-y-4">
        <h2 className="text-3xl font-bold text-on-surface">
          Engineered for Scalability
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          The infrastructure to handle thousands of employees with microsecond
          latency and absolute accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {FEATURES_DATA.map((feature, index) => (
          <div
            key={index}
            className={`p-10 ${feature.bgClass} border border-outline-variant/10 hover:bg-surface-container-high transition-colors group`}
          >
            <span
              className={`material-symbols-outlined ${feature.iconColor} text-4xl mb-6 block group-hover:scale-110 transition-transform`}
              data-icon={feature.icon}
            >
              {feature.icon}
            </span>
            <h3 className="text-xl font-bold mb-4 text-on-surface">
              {feature.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
