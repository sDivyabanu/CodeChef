import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import Popup from "./Popup";
import "../../Styles/Department/Department-Card.css";
import { ImageLoaderComponent } from "../../Utility";

function DeptCard({ name, icon, description, memberCount, allMembers, currentLeads }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const departmentLeads = currentLeads.filter((lead) => lead.position === name);
// Cleaner, more robust filtering
  const departmentLeads = currentLeads.filter((lead) => {
    // Safety check: ensure values exist
    const leadPos = lead.position ? lead.position.toLowerCase() : "";
    const deptName = name ? name.toLowerCase() : "";

    // 1. Direct Match (ignores case and simple spaces)
    if (leadPos.trim() === deptName.trim()) return true;

    // 2. Bulletproof Fix for "Sponsorship & Marketing"
    // Checks if both the Dept name AND the Lead position contain BOTH keywords
    if (
      deptName.includes("sponsorship") &&
      deptName.includes("marketing") &&
      leadPos.includes("sponsorship") &&
      leadPos.includes("marketing")
    ) {
      return true;
    }

    // 3. Optional: Fix for "Social Media & Content" (if needed)
    if (
      deptName.includes("social") &&
      deptName.includes("content") &&
      leadPos.includes("social") &&
      leadPos.includes("content")
    ) {
      return true;
    }

    return false;
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
