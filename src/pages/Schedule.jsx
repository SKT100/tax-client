import { motion } from 'framer-motion';
import AppointmentForm from '../components/sections/schedule/AppointmentForm';
import ChamberMapCard from '../components/ui/ChamberMapCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function Schedule() {
  return (
    <div className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen">
      <main className="relative z-10 w-full pt-16 md:pt-24 pb-[35vh] md:pb-[45vh]">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
            <motion.div
              className="lg:col-span-5 flex flex-col pt-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-light tracking-tight text-primary-light dark:text-primary-dark mb-6"
              >
                Schedule Your <br />
                <span className="italic font-light opacity-90">Legal Consultation</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-lg leading-relaxed"
              >
                Direct 1-on-1 confidential consultation with Satyendra Agrawal, Advocate on Record, Supreme Court of India, for appellate litigation, constitutional writs, arbitration, or statutory defense.
              </motion.p>
            </motion.div>

            <div className="lg:col-span-7">
              <AppointmentForm />
            </div>
          </div>

          <div className="pt-16 border-t border-theme mb-12">
            <ChamberMapCard />
          </div>

        </div>
      </main>
    </div>
  );
}