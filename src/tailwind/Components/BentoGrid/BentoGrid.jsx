function CtaLink({ href, cta }) {
  const content = (
    <>
      {cta}
      <span className="ms-2 text-[#7BE9C6] transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
        →
      </span>
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex items-center p-0 text-sm font-semibold text-neutral-400" aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      className="group/cta pointer-events-auto inline-flex items-center rounded-sm p-0 text-sm font-semibold text-[#1620E4] no-underline outline-none transition-colors hover:text-[#0f16a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]"
    >
      {content}
    </a>
  );
}

export function BentoGrid({ children, className = '', ...props }) {
  return (
    <div
      className={`grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className = '',
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) {
  return (
    <article
      className={`group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl bg-white text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-neutral-950 dark:text-neutral-100 dark:shadow-[0_-20px_80px_-20px_#ffffff1f_inset] dark:border dark:border-white/10 ${className}`.trim()}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {background}
      </div>

      <div className="relative z-10 mt-auto p-4">
        <div className="pointer-events-none z-10 flex translate-y-0 transform-gpu flex-col gap-1 transition-all duration-300 motion-reduce:transition-none lg:group-hover:-translate-y-10 lg:group-focus-within:-translate-y-10 motion-reduce:lg:group-hover:translate-y-0 motion-reduce:lg:group-focus-within:translate-y-0">
          {Icon ? (
            <Icon
              className="h-12 w-12 origin-left transform-gpu text-[#1620E4] transition-all duration-300 ease-in-out motion-reduce:transition-none group-hover:scale-75 group-focus-within:scale-75 motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
              aria-hidden="true"
            />
          ) : null}
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
          <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div className="pointer-events-none mt-3 flex w-full flex-row items-center lg:hidden">
          <CtaLink href={href} cta={cta} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-within:translate-y-0 lg:flex">
        <CtaLink href={href} cta={cta} />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] transform-gpu bg-transparent transition-all duration-300 motion-reduce:transition-none group-hover:bg-black/3 group-focus-within:bg-black/3 dark:group-hover:bg-neutral-800/10 dark:group-focus-within:bg-neutral-800/10"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[3px] bg-gradient-to-r from-[#1620E4] to-[#7BE9C6]"
        aria-hidden="true"
      />
    </article>
  );
}

// Required global keyframes (add to your CSS entry if using custom animations):
// None required — this component uses CSS transitions only.
// Prefer Tailwind v4 motion-reduce: variants (already applied) so prefers-reduced-motion is honored.
