import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import Popup from "./Popup";
import "../../Styles/Department/Department-Card.css";
import { ImageLoaderComponent } from "../../Utility";

function DeptCard({ name, icon, description, memberCount, allMembers, currentLeads }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const departmentLeads = currentLeads.filter((lead) => lead.position === name);
  const normalizeDepartmentName = (value = "") => {
    const normalized = value.toLowerCase().trim();

    if (normalized.includes("technical") || normalized.includes("competitive programming")) {
      return "technical cp";
    }

    if (
      normalized.includes("projects & web dev") ||
      normalized.includes("projects and web dev") ||
      normalized.includes("web development") ||
      normalized === "projects"
    ) {
      return "projects web dev";
    }

    if (
      normalized.includes("outreach") ||
      normalized.includes("marketing") ||
      normalized.includes("sponsorship")
    ) {
      return "outreach";
    }

    return normalized.replace(/&/g, "and");
  };

// Cleaner, more robust filtering
  const departmentLeads = currentLeads.filter((lead) => {
    // Safety check: ensure values exist
    const leadPos = normalizeDepartmentName(lead.position);
    const deptName = normalizeDepartmentName(name);

    // 1. Direct Match (ignores case and simple spaces)
    return leadPos === deptName;
  });

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    },
  };

  const transition = {
    duration: 0.75,
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="department-card"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false }}
          variants={cardVariants}
          transition={transition}
        >
          <div className="card-top">
            <h3>{name}</h3>
            {icon && (
              <span className="icon">
                <img src={icon} alt="Icon" height={"50px"} width={"50px"} />
              </span>
            )}
          </div>
          <p>{description}</p>
          <div className="w-full">
            <div className="lead-section mb-2">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {departmentLeads?.map((lead, index) => (
                  <a 
                    key={index} 
                    target="_blank" 
                    href={lead.linkedin}
                    className="flex flex-col items-center"
                    rel="noreferrer"
                  >
                    <ImageLoaderComponent 
                      url={lead.imageUrl}
                      hashCode={lead.imageHashCode}
                      alt={lead.name}
                      className="rounded-full h-[40px] w-[40px] sm:h-[45px] sm:w-[45px] object-cover"
                      blurWidth={'45px'}
                      blurHeight={'45px'}
                      rounded={true}
                    />
                    <span className="text-xs mt-1 text-center capitalize max-w-[60px] sm:max-w-[75px] truncate">
                      {lead.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <button
              className="member-count-button w-full"
              onClick={handleButtonClick}
            >
              {memberCount === 1
                ? `${memberCount} Member`
                : `${memberCount} Members`}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isPopupOpen && (
          <Popup
            name={name}
            members={allMembers}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

DeptCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  description: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      regNo: PropTypes.string.isRequired,
      linkedIn: PropTypes.string.isRequired,
    })
  ).isRequired,
  lead: PropTypes.arrayOf(
    PropTypes.shape({
      leadName: PropTypes.string.isRequired,
      leadImg: PropTypes.string.isRequired,
      leadLinkedIn: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DeptCard;
