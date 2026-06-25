// client/src/Pages/Leads/Batch24.jsx
import { useState, useEffect } from "react";
import LeadCard from "../../Components/Leads/LeadCard";
import LeadsBackgroundImage from "/Background/LeadsBackground.svg";
import { Team24 } from "../../Constants/Teams/Batch24Data";
import { Team23 } from "../../Constants/Teams/Batch23Data";
import { getAllLeads } from "../../api/apiCall";
import ErrorBox from "../../Utility/ErrorBox";
import { FaSpinner } from "react-icons/fa";

const LEAD_YEARS = [23, 24, 25, 26];
const SANITY_LEAD_START_YEAR = 25;

const getBatchValue = (year) => `20${year}`;

const getYearLabel = (year) => {
  const startYear = 2000 + year;
  const endYear = String(year + 1).padStart(2, "0");
  return `${startYear}-${endYear}`;
};

const normalizePosition = (value = "") =>
  value.toLowerCase().replace(/&/g, "and").trim().replace(/\d+$/, "");

const positionMatches = (position, aliases) => {
  const normalized = normalizePosition(position);
  return aliases.some((alias) => normalized === alias);
};

const getPositionEntries = (team, aliases) =>
  Object.entries(team || {}).filter(([key]) => positionMatches(key, aliases));

const renderTopLead = (key, lead, title, wrapperClassName, headingClassName) => (
  <div key={key} className={wrapperClassName}>
    <h3 className={headingClassName}>{title}</h3>
    <LeadCard
      name={lead.name}
      image={lead.image}
      hashCode={lead.hash}
      link={lead.linkedIn}
    />
  </div>
);

const renderYearTabs = (activeYear, setYear) => (
  <div className="flex items-center justify-center space-x-4">
    {LEAD_YEARS.map((year) => (
      <div
        key={year}
        onClick={() => setYear(year)}
        className={`cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 p-1 rounded ${
          activeYear === year ? "text-2xl text-[#0DCAF0]" : "text-lg text-gray-500"
        }`}
      >
        {getYearLabel(year)}
      </div>
    ))}
  </div>
);

function Batch24() {
  const [year, setYear] = useState(26); // Use this for displaying 2026-2027 leads by default
  const [sanityTeam, setSanityTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSanityTeam = async () => {
      if (year >= SANITY_LEAD_START_YEAR) {
        setLoading(true);
        setError(false);
        try {
          const data = await getAllLeads();
          if (data.error) {
            setError(true);
          } else {
            const currentBatch = getBatchValue(year);
            const batchLeads = data.filter((lead) => lead.batch === currentBatch);
            const transformedData = {};

            batchLeads.forEach((lead) => {
              let positionKey = lead.position;
              // Handle positions that might have multiple people
              if (transformedData[positionKey]) {
                // If position already exists, add a number suffix
                let count = 1;
                while (transformedData[`${positionKey}${count}`]) {
                  count++;
                }
                positionKey = `${positionKey}${count}`;
              }

              transformedData[positionKey] = {
                name: lead.name,
                linkedIn: lead.linkedin,
                image: lead.imageUrl,
                hash: lead.imageHashCode,
              };
            });

            setSanityTeam(
              Object.keys(transformedData).length ? transformedData : null
            );
          }
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSanityTeam();
  }, [year]);

  if (year == 24) {
    return (
      <div
        className="py-16 sm:py-8"
        style={{
          backgroundImage: `url(${LeadsBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-[64px] text-center font-bold uppercase text-gray-700 pd-8">
          Leads
        </h1>
        {renderYearTabs(year, setYear)}

        <div className="hidden md:flex md:flex-row justify-center items-center md:items-end">
          <div className="inline-block scale-125 my-10">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Vice President
            </h3>
            <LeadCard
              name={Team24["Vice President"].name}
              image={Team24["Vice President"].image}
              hashCode={Team24["Vice President"].hash}
              link={Team24["Vice President"].linkedIn}
            />
          </div>
          <div className="inline-block scale-150 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              President
            </h3>
            <LeadCard
              name={Team24.President.name}
              image={Team24.President.image}
              hashCode={Team24.President.hash}
              link={Team24.President.linkedIn}
            />
          </div>
          <div className="inline-block scale-125 my-10">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              General Secretary
            </h3>
            <LeadCard
              name={Team24["General Secretary"].name}
              image={Team24["General Secretary"].image}
              hashCode={Team24["General Secretary"].hash}
              link={Team24["General Secretary"].linkedIn}
            />
          </div>
        </div>

        <div className="flex flex-col block md:hidden md:flex-row justify-center items-center md:items-end max-[440px]:scale-90">
          <div className="inline-block scale-150 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              President
            </h3>
            <LeadCard
              name={Team24.President.name}
              image={Team24.President.image}
              hashCode={Team24.President.hash}
              link={Team24.President.linkedIn}
            />
          </div>
          <div className="w-full flex flex-row justify-evenly justify-evenly">
            <div className="inline-block scale-105 my-10">
              <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
                Vice President
              </h3>
              <LeadCard
                name={Team24["Vice President"].name}
                image={Team24["Vice President"].image}
                hashCode={Team24["Vice President"].hash}
                link={Team24["Vice President"].linkedIn}
              />
            </div>
            <div className="inline-block scale-105 my-10">
              <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
                General Secretary
              </h3>
              <LeadCard
                name={Team24["General Secretary"].name}
                image={Team24["General Secretary"].image}
                hashCode={Team24["General Secretary"].hash}
                link={Team24["General Secretary"].linkedIn}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end">
          <div className="inline-block items-bottom ">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Competitive Programming
            </h3>
            <div className="flex">
              <LeadCard
                name={Team24["Competitive Programming1"].name}
                image={Team24["Competitive Programming1"].image}
                hashCode={Team24["Competitive Programming1"].hash}
                link={Team24["Competitive Programming1"].linkedIn}
              />
              <LeadCard
                name={Team24["Competitive Programming2"].name}
                image={Team24["Competitive Programming2"].image}
                hashCode={Team24["Competitive Programming2"].hash}
                link={Team24["Competitive Programming2"].linkedIn}
              />
            </div>
          </div>
          <div className="inline-block">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Web Development
            </h3>
            <LeadCard
              name={Team24["Web Development"].name}
              image={Team24["Web Development"].image}
              hashCode={Team24["Web Development"].hash}
              link={Team24["Web Development"].linkedIn}
            />
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Finance
            </h3>
            <div className="flex">
              <LeadCard
                name={Team24["Finance1"].name}
                image={Team24["Finance1"].image}
                hashCode={Team24["Finance1"].hash}
                link={Team24["Finance1"].linkedIn}
              />
              <LeadCard
                name={Team24["Finance2"].name}
                image={Team24["Finance2"].image}
                hashCode={Team24["Finance2"].hash}
                link={Team24["Finance2"].linkedIn}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end ">
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Event Management
            </h3>
            <div className="flex">
              <LeadCard
                name={Team24["Event Management1"].name}
                image={Team24["Event Management1"].image}
                hashCode={Team24["Event Management1"].hash}
                link={Team24["Event Management1"].linkedIn}
              />
              <LeadCard
                name={Team24["Event Management2"].name}
                image={Team24["Event Management2"].image}
                hashCode={Team24["Event Management2"].hash}
                link={Team24["Event Management2"].linkedIn}
              />
            </div>
          </div>
          <div className="inline-block transform -translate-y-8 pt-8">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Social Media & Content
            </h3>
            <div className="flex">
              <LeadCard
                name={Team24["SocialMedia1"].name}
                image={Team24["SocialMedia1"].image}
                hashCode={Team24["SocialMedia1"].hash}
                link={Team24["SocialMedia1"].linkedIn}
              />
              <LeadCard
                name={Team24["SocialMedia2"].name}
                image={Team24["SocialMedia2"].image}
                hashCode={Team24["SocialMedia2"].hash}
                link={Team24["SocialMedia2"].linkedIn}
              />
            </div>
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Sponsorship & Marketing
            </h3>
            <div className="flex">
              <LeadCard
                name={Team24["Marketing & Sponsorship1"].name}
                image={Team24["Marketing & Sponsorship1"].image}
                hashCode={Team24["Marketing & Sponsorship1"].hash}
                link={Team24["Marketing & Sponsorship1"].linkedIn}
              />
              <LeadCard
                name={Team24["Marketing & Sponsorship2"].name}
                image={Team24["Marketing & Sponsorship2"].image}
                hashCode={Team24["Marketing & Sponsorship2"].hash}
                link={Team24["Marketing & Sponsorship2"].linkedIn}
              />
            </div>
          </div>
        </div>

        <div className="flex  md:scale-110 md:py-10 lg:scale-100 justify-evenly items-end">
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Design
            </h3>
            <div className="flex">
              <LeadCard
                name={Team24["Design1"].name}
                image={Team24["Design1"].image}
                hashCode={Team24["Design1"].hash}
                link={Team24["Design1"].linkedIn}
              />
              <LeadCard
                name={Team24["Design2"].name}
                image={Team24["Design2"].image}
                hashCode={Team24["Design2"].hash}
                link={Team24["Design2"].linkedIn}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (year === 23) {
    return (
      <div
        className="py-16 sm:py-8"
        style={{
          backgroundImage: `url(${LeadsBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-[64px] text-center font-bold uppercase text-gray-700 pd-8">
          Leads
        </h1>
        {renderYearTabs(year, setYear)}

        {/* Left Aligned Cards */}
        {/* <div className="hidden md:flex md:flex-row justify-center items-center md:items-end">
        <div className="inline-block scale-125 my-10">
          <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Vice President
            </h3>
            <LeadCard
              name={Team23['Vice President'].name}
              image={Team23['Vice President'].image}
              hashCode={Team23['Vice President'].hash}
              link={Team23['Vice President'].linkedIn}
            />
          </div>
          <div className="inline-block pl-32  scale-150 my-20 ">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              President
            </h3>
            <LeadCard
              name={Team23.President.name}
              image={Team23.President.image}
              hashCode={Team23.President.hash}
              link={Team23.President.linkedIn}
            />
          </div>
          
        </div> */}

        {/* Right Aligned Cards */}
        <div className="hidden md:flex md:flex-row justify-center items-center md:items-end">
          <div className="inline-block pl-32 mr-24 scale-150 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              President
            </h3>
            <LeadCard
              name={Team23.President.name}
              image={Team23.President.image}
              hashCode={Team23.President.hash}
              link={Team23.President.linkedIn}
            />
          </div>
          <div className="inline-block scale-125 ml-12 my-10">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Vice President
            </h3>
            <LeadCard
              name={Team23["Vice President"].name}
              image={Team23["Vice President"].image}
              hashCode={Team23["Vice President"].hash}
              link={Team23["Vice President"].linkedIn}
            />
          </div>
        </div>

        {/* Top Bottom Center - Aligned Cards */}
        {/* <div className="hidden md:flex md:flex-row justify-center flex items-center md:items-end">
          <div className="inline-block  mr-24 scale-150 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              President
            </h3>
            <LeadCard
              name={Team23.President.name}
              image={Team23.President.image}
              hashCode={Team23.President.hash}
              link={Team23.President.linkedIn}
            />
          </div>
          
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Vice President
            </h3>
            <LeadCard
              name={Team23['Vice President'].name}
              image={Team23['Vice President'].image}
              hashCode={Team23['Vice President'].hash}
              link={Team23['Vice President'].linkedIn}
            />
        </div> */}

        <div className="flex flex-col block md:hidden md:flex-row justify-center items-center md:items-end max-[440px]:scale-90">
          <div className="inline-block scale-150 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              President
            </h3>
            <LeadCard
              name={Team23.President.name}
              image={Team23.President.image}
              hashCode={Team23.President.hash}
              link={Team23.President.linkedIn}
            />
          </div>
          <div className="w-full flex flex-row justify-evenly ">
            <div className="inline-block scale-105 my-10">
              <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
                Vice President
              </h3>
              <LeadCard
                name={Team23["Vice President"].name}
                image={Team23["Vice President"].image}
                hashCode={Team23["Vice President"].hash}
                link={Team23["Vice President"].linkedIn}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end">
          <div className="inline-block items-bottom ">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Competitive Programming
            </h3>
            <div className="flex">
              <LeadCard
                name={Team23["Competitive Programming1"].name}
                image={Team23["Competitive Programming1"].image}
                hashCode={Team23["Competitive Programming1"].hash}
                link={Team23["Competitive Programming1"].linkedIn}
              />
              <LeadCard
                name={Team23["Competitive Programming2"].name}
                image={Team23["Competitive Programming2"].image}
                hashCode={Team23["Competitive Programming2"].hash}
                link={Team23["Competitive Programming2"].linkedIn}
              />
            </div>
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Finance
            </h3>
            <LeadCard
              name={Team23["Finance1"].name}
              image={Team23["Finance1"].image}
              hashCode={Team23["Finance1"].hash}
              link={Team23["Finance1"].linkedIn}
            />
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Design & Content
            </h3>
            <div className="flex">
              <LeadCard
                name={Team23["Design1"].name}
                image={Team23["Design1"].image}
                hashCode={Team23["Design1"].hash}
                link={Team23["Design1"].linkedIn}
              />
              <LeadCard
                name={Team23["Design2"].name}
                image={Team23["Design2"].image}
                hashCode={Team23["Design2"].hash}
                link={Team23["Design2"].linkedIn}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end ">
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Event Management
            </h3>
            <div className="flex">
              <LeadCard
                name={Team23["Event Management1"].name}
                image={Team23["Event Management1"].image}
                hashCode={Team23["Event Management1"].hash}
                link={Team23["Event Management1"].linkedIn}
              />
              <LeadCard
                name={Team23["Event Management2"].name}
                image={Team23["Event Management2"].image}
                hashCode={Team23["Event Management2"].hash}
                link={Team23["Event Management2"].linkedIn}
              />
            </div>
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Sponsorship & Marketing
            </h3>
            <div className="flex">
              <LeadCard
                name={Team23["Marketing & Sponsorship1"].name}
                image={Team23["Marketing & Sponsorship1"].image}
                hashCode={Team23["Marketing & Sponsorship1"].hash}
                link={Team23["Marketing & Sponsorship1"].linkedIn}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Sanity-backed lead years
    return (
      <div
        className="py-16 sm:py-8"
        style={{
          backgroundImage: `url(${LeadsBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-[64px] text-center font-bold uppercase text-gray-700 pd-8">
          Leads
        </h1>
        {renderYearTabs(year, setYear)}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-[#0DCAF0]" />
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <ErrorBox />
          </div>
        ) : sanityTeam ? (
          <>
            {/* President, VP, General Secretary */}
            <div className="hidden md:grid grid-cols-[minmax(220px,1fr)_auto_minmax(260px,1fr)] items-end gap-x-6 lg:gap-x-10 max-w-7xl mx-auto px-8 mt-28 mb-24">
              <div className="flex justify-center">
                {getPositionEntries(sanityTeam, ["vice president"]).map(
                  ([key, lead]) =>
                    renderTopLead(
                      key,
                      lead,
                      "Vice President",
                      "inline-block scale-110 lg:scale-125 origin-bottom",
                      "text-[24px] whitespace-nowrap text-center font-bold text-gray-700 py-2"
                    )
                )}
              </div>

              <div className="flex justify-center">
                {getPositionEntries(sanityTeam, ["president"]).map(([key, lead]) =>
                  renderTopLead(
                    key,
                    lead,
                    "President",
                    "inline-block scale-150 origin-bottom",
                    "text-[24px] whitespace-nowrap text-center font-bold text-gray-700 py-2"
                  )
                )}
              </div>

              <div className="flex justify-center items-end gap-4 lg:gap-6">
                {[
                  ...getPositionEntries(sanityTeam, ["general secretary"]).map(
                    ([key, lead]) => [key, lead, "General Secretary"]
                  ),
                  ...getPositionEntries(sanityTeam, [
                    "co-secretary",
                    "co secretary",
                  ]).map(([key, lead]) => [key, lead, "Co-Secretary"]),
                ].map(([key, lead, title]) =>
                  renderTopLead(
                    key,
                    lead,
                    title,
                    "inline-block scale-105 lg:scale-110 origin-bottom",
                    "text-[20px] xl:text-[22px] whitespace-nowrap text-center font-bold text-gray-700 py-2"
                  )
                )}
              </div>
            </div>

            {/* Mobile view for top positions */}
            <div className="flex flex-col md:hidden justify-center items-center px-4 pt-8 pb-12">
              {getPositionEntries(sanityTeam, ["president"]).map(([key, lead]) =>
                renderTopLead(
                  key,
                  lead,
                  "President",
                  "inline-block scale-125 origin-bottom mb-16",
                  "text-[24px] whitespace-nowrap text-center font-bold text-gray-700 py-2"
                )
              )}

              <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-x-4 gap-y-8 justify-items-center w-full max-w-[520px]">
                {[
                  ...getPositionEntries(sanityTeam, ["vice president"]).map(
                    ([key, lead]) => [key, lead, "Vice President"]
                  ),
                  ...getPositionEntries(sanityTeam, ["general secretary"]).map(
                    ([key, lead]) => [key, lead, "General Secretary"]
                  ),
                  ...getPositionEntries(sanityTeam, [
                    "co-secretary",
                    "co secretary",
                  ]).map(([key, lead]) => [key, lead, "Co-Secretary"]),
                ].map(([key, lead, title]) =>
                  renderTopLead(
                    key,
                    lead,
                    title,
                    "inline-block",
                    "text-[20px] whitespace-nowrap text-center font-bold text-gray-700 py-2"
                  )
                )}
              </div>
            </div>

            {/* First Row: Technical (CP), Web Development, Finance */}
            <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end">
              {/* Technical (CP) */}
              {Object.entries(sanityTeam).filter(([key]) =>
                positionMatches(key, ["technical (cp)", "competitive programming"])
              ).length > 0 && (
                <div className="inline-block items-bottom">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Technical (CP)
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) =>
                        positionMatches(key, ["technical (cp)", "competitive programming"])
                      )
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Web Development */}
              {Object.entries(sanityTeam).filter(([key]) =>
                positionMatches(key, ["web development"])
              ).length > 0 && (
                <div className="inline-block">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Web Development
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) =>
                        positionMatches(key, ["web development"])
                      )
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Finance */}
              {Object.entries(sanityTeam).filter(([key]) => key.includes("Finance"))
                .length > 0 && (
                <div className="inline-block items-bottom">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Finance
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) => key.includes("Finance"))
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Second Row: Event Management, Social Media & Content, Marketing & Sponsorship */}
            <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end">
              {/* Event Management */}
              {Object.entries(sanityTeam).filter(([key]) =>
                key.includes("Event Management")
              ).length > 0 && (
                <div className="inline-block items-bottom">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Event Management
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) => key.includes("Event Management"))
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Social Media & Content */}
              {Object.entries(sanityTeam).filter(
                ([key]) =>
                  key.includes("Social Media") || key.includes("SocialMedia")
              ).length > 0 && (
                <div className="inline-block transform -translate-y-8 pt-8">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Social Media & Content
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(
                        ([key]) =>
                          key.includes("Social Media") ||
                          key.includes("SocialMedia")
                      )
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Marketing & Sponsorship */}
              {Object.entries(sanityTeam).filter(
                ([key]) =>
                  positionMatches(key, [
                    "outreach",
                    "marketing and sponsorship",
                    "outreach and sponsorship",
                  ])
              ).length > 0 && (
                <div className="inline-block items-bottom">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Outreach
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(
                        ([key]) =>
                          positionMatches(key, [
                            "outreach",
                            "marketing and sponsorship",
                            "outreach and sponsorship",
                          ])
                      )
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Third Row: Design, Projects, Projects & Web Dev */}
            <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-center items-center lg:items-end">
              {/* Design */}
              {Object.entries(sanityTeam).filter(([key]) => key.includes("Design"))
                .length > 0 && (
                <div className="inline-block items-bottom mx-4">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Design
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) => key.includes("Design"))
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {Object.entries(sanityTeam).filter(([key]) =>
                positionMatches(key, ["projects"])
              ).length > 0 && (
                <div className="inline-block items-bottom mx-4">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Projects
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) => positionMatches(key, ["projects"]))
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Projects & Web Dev */}
              {Object.entries(sanityTeam).filter(([key]) =>
                positionMatches(key, ["projects and web dev"])
              ).length > 0 && (
                <div className="inline-block items-bottom mx-4">
                  <h3 className="text-24 text-center font-bold text-gray-700 py-2">
                    Projects & Web Dev
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(sanityTeam)
                      .filter(([key]) =>
                        positionMatches(key, ["projects and web dev"])
                      )
                      .map(([key, lead]) => (
                        <LeadCard
                          key={key}
                          name={lead.name}
                          image={lead.image}
                          hashCode={lead.hash}
                          link={lead.linkedIn}
                        />
                      ))}
                  </div>
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <div className="px-10 py-8 bg-blue-500 bg-opacity-50 border-4 border-blue-700 rounded-lg shadow-lg text-center mx-5 my-20 inline-block">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
                This could be you!
              </h1>
              <p className="text-l md:text-xl text-gray-600">
                Join our ranks and shine brightly to be remembered forever
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Batch24;
