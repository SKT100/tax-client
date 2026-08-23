import PillButton from "../../ui/PillButton";
export default function CTA() {
  return (
    <section>
      {" "}
      <div className="bg-obsidian dark:bg-[#1C1B1B] py-32 text-center border-t border-transparent dark:border-wireframe rounded-theme-pill rounded-b-none transition-all duration-300">
        {" "}
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto flex flex-col items-center gap-12">
          {" "}
          <h2 className="font-serif text-5xl md:text-7xl font-light text-primary-dark">
            Secure Legal Representation
          </h2>{" "}
          <PillButton variant="on-dark" className="px-12 py-5 text-base">
            {" "}
            BOOK YOUR CONSULTATION{" "}
          </PillButton>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
