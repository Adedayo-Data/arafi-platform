const Foot2 = () => {
  return (
    <footer className="mt-auto border-t border-outline-variant dark:border-outline-variant bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-max-width mx-auto w-full gap-4">
        <span className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" />
          <p> Arafi</p>
        </span>
        <div className="flex gap-6">
          <a
            className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface underline transition-opacity duration-150"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface underline transition-opacity duration-150"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface underline transition-opacity duration-150"
            href="#"
          >
            Security
          </a>
          <a
            className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface underline transition-opacity duration-150"
            href="#"
          >
            Status
          </a>
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant">
          © 2026 Arafi Technologies Inc.
        </div>
      </div>
    </footer>
  );
};

export default Foot2;
