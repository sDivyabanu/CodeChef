import { useEffect, useState } from "react";

import DeptCard from "./Department-Card.jsx";
import "../../Styles/Department/Department-Display.css";

// importing icons
import { FaTrophy } from "react-icons/fa6";
import { IoMdBrush } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { GiTie } from 'react-icons/gi';
import { FaHandshake } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { defaultpfp, vishalpfp } from "../../assets/index.js";

// API call
import { getAllDepartments, getAllMembers, getAllLeads } from "../../api/apiCall";
import ErrorBox from "../../Utility/ErrorBox.jsx";

function DeptDisplay() {
  const mockData = [
    {
      name: "Event Management",
      icon: GiTie,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Shashank Sharma",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
        {
          leadName: "Shashank Sharma",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },

    {
      name: "Finance",
      icon: FaHandshake,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Sairam",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
        {
          leadName: "Sairam",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },

    {
      name: "Web Development",
      icon: TbWorld,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Aaditya Prabhu",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },

    {
      name: "Design and Content",
      icon: IoMdBrush,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Vishal Kumar Yadav",
          leadImg: vishalpfp,
          leadLinkedIn: "https://google.com",
        },
        {
          leadName: "Vishal Kumar Yadav",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },

    {
      name: "Design and Content",
      icon: IoMdBrush,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Vishal Kumar Yadav",
          leadImg: vishalpfp,
          leadLinkedIn: "https://google.com",
        },
        {
          leadName: "Vishal Kumar Yadav",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },

    {
      name: "Competetive Programming",
      icon: FaTrophy,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Akkilesh",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
        {
          leadName: "Akkilesh",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },

    {
      name: "Event Management",
      icon: GiTie,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum cupiditate nam omnis eius, alias id qui eaque molestias harum in aut neque. Minima quae voluptas rerum harum qui similique!",
      members: [
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "qwe", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "asd", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "zxc", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "rty", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "ghf", regNo: "22BCE1234", linkedIn: "https://example.com" },
        { name: "vbn", regNo: "22BCE1234", linkedIn: "https://example.com" },
      ],
      lead: [
        {
          leadName: "Shashank Sharma",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
        {
          leadName: "Shashank Sharma",
          leadImg: defaultpfp,
          leadLinkedIn: "https://google.com",
        },
      ],
    },
  ];

  const [departments, setDepartments] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const data = await getAllDepartments();
      if (data.error) {
        setError(true);
      } else {
        setDepartments(data);
      }
      setLoading(false);
    };

    const fetchMembers = async () => {
      setLoading(true);
      const data = await getAllMembers();
      if (data.error) {
        setError(true);
      } else {
        setAllMembers(data);
      }
      setLoading(false);
    };

    const fetchLeads = async () => {
      setLoading(true);
      const data = await getAllLeads();
      if (data.error) {
        setError(true);
      } else {
        setAllLeads(data);
      }
      setLoading(false);
    };

    fetchDepartments();
    fetchMembers();
    fetchLeads();
  }, []);

  const currentBatch = "2026"; // Use this for displaying 2026-2027 leads by default
  const currentLeads = allLeads.filter((lead) => lead.batch === currentBatch);

  const renderDeptCards = (data) => {
    return data.map((dept, index) => (
      <DeptCard
        key={index}
        name={dept.name}
        icon={dept.icon}
        description={dept.description}
        memberCount={dept.members}
        allMembers={allMembers}
        currentLeads={currentLeads}
      />
    ));
  };

  return (
    <div className="main">
      <div className="display text-center md:text-left">
        <h2>Our Departments</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="spinner text-center text-xl sm:text-3xl" />
          </div>
        ) : error ? (
          <div className="flex">
            <ErrorBox />
          </div>
        ) : departments.length ? (
          renderDeptCards(departments)
        ) : (
          renderDeptCards(mockData)
        )}
      </div>
    </div>
  );
}

export default DeptDisplay;
