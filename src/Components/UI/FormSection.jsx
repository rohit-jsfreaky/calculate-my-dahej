/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const FormSection = ({ children, title, description }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl border border-purple-200 mb-8"
      whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h3 className="text-2xl font-bold mb-2">{title}</h3>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default FormSection;