const fetch = require("node-fetch");

// Email sending packages and config. ********
const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codechef.vitcc@gmail.com",
    pass: "eguq lcud nyfp zdmm",
  },
});
// *****************************************

// ************* Docs to work with Google Sheet Integration ******************

// ************** Sanity Integration to Get the Latest Google Sheets ***********

const sanityClient = require("@sanity/client");

const client = sanityClient.createClient({
  projectId: "2e6x5erf",
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token:
    "skiwXyd1N4dGbQr3p1GK1d6eENBeWgFLX6DjppkobW3bX8npVtgjnFNKhNbYlydDH3U8EKUxHBRoiU9ROcf8fxzf0XHgZLyCMrHTz6HEAfwmigvqPxnZvTtLlOCFIW5YIiGydFRrsdbPa58XedlykSoRNN35sQEOq1vhC3NbyibJRdvVV1nR",
});

async function getSheetLinks() {
  const query = `*[_type == "recruitmentSheetLinks"] | order(_createdAt desc)[0]`;

  try {
    const result = await client.fetch(query);
    return result; // { joinUsSheetBest: "...", contactUsSheetBest: "..." }
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

function getJoinUsSheetBestLink(links, department) {
  const departmentSheetBestLinks = {
    competitive_programming: links?.competitiveProgrammingSheetBest,
    design: links?.designSheetBest,
    management: links?.managementSheetBest,
    marketing_and_outreach: links?.marketingOutreachSheetBest,
    projects: links?.projectsSheetBest,
    social_media_and_content: links?.socialMediaContentSheetBest,
    web_development: links?.webDevelopmentSheetBest,
  };

  return departmentSheetBestLinks[department] || links?.joinUsSheetBest;
}

function getAllJoinUsSheetBestLinks(links) {
  const sheetLinks = [
    links?.competitiveProgrammingSheetBest,
    links?.designSheetBest,
    links?.managementSheetBest,
    links?.marketingOutreachSheetBest,
    links?.projectsSheetBest,
    links?.socialMediaContentSheetBest,
    links?.webDevelopmentSheetBest,
  ];

  if (!sheetLinks.some(Boolean) && links?.joinUsSheetBest) {
    sheetLinks.push(links.joinUsSheetBest);
  }

  return [...new Set(sheetLinks.filter(Boolean))];
}

function copyFirstPresent(target, source, key, aliases = []) {
  const keys = [key, `pref2_${key}`, ...aliases, ...aliases.map((alias) => `pref2_${alias}`)];
  for (const candidate of keys) {
    if (
      source[candidate] !== undefined &&
      source[candidate] !== null &&
      source[candidate] !== ""
    ) {
      target[key] = source[candidate];
      return;
    }
  }
}

function normalizeRecruitmentData(data) {
  if (!["design", "management", "marketing_and_outreach"].includes(data.department)) {
    return data;
  }

  const normalized = { ...data };

  [
    "name",
    "reg_no",
    "vit_email",
    "phone_no",
    "degree",
    "branch",
    "experience",
    "whyJoin",
    "department",
    "cgpa",
  ].forEach((field) => copyFirstPresent(normalized, data, field));

  if (data.department === "design") {
    copyFirstPresent(normalized, data, "designSkills", ["designSoftware"]);
    copyFirstPresent(normalized, data, "whyDesign");
    copyFirstPresent(normalized, data, "yourWork");
    copyFirstPresent(normalized, data, "designPortfolio");
  } else if (data.department === "management") {
    copyFirstPresent(normalized, data, "hostelerORdayscholar");
    copyFirstPresent(normalized, data, "otherClub");
    copyFirstPresent(normalized, data, "roleInCurrentClub", [
      "managementExperience",
    ]);
    copyFirstPresent(normalized, data, "handleSituation", [
      "uncooperativeMember",
    ]);
    copyFirstPresent(normalized, data, "strength", ["managementStrengths"]);
    copyFirstPresent(normalized, data, "effectiveComm", [
      "managementCommunications",
    ]);
  } else if (data.department === "marketing_and_outreach") {
    copyFirstPresent(normalized, data, "hostelerORdayscholar", [
      "outreachExperience",
    ]);
    copyFirstPresent(normalized, data, "secureSponsors", [
      "outreachSponsorship",
    ]);
    copyFirstPresent(normalized, data, "promoteEvent", ["outreachCaptions"]);
    copyFirstPresent(normalized, data, "moreParticipants");
  }

  Object.keys(normalized).forEach((key) => {
    if (
      key.startsWith("pref2_") ||
      normalized[key] === undefined ||
      normalized[key] === null
    ) {
      delete normalized[key];
    }
  });

  return normalized;
}

// https://docs.sheet.best/#generating-your-rest-api
// ***************************************************************************

// const contactUsGoogleSheetLink =
//   "https://sheet.best/api/sheets/d62f5c63-d82b-4188-9e19-b8711709ef35";

// const contactUsGoogleSheetLink =
//   "https://api.sheetbest.com/sheets/286a43cd-cc9b-46ea-88a2-66b8c5fa6b11";

// const joinUsGoogleSheetLink =
//   "https://api.sheetbest.com/sheets/be02efdc-b4db-4d82-91a8-45243ccb83a5";

// const joinUsGoogleSheetLink =
//   "https://api.sheetbest.com/sheets/c3b9d284-3ede-4336-a866-13995f8965bf";

// ***************** Contact us APIs Start Here ***********************************
// reading all the emails from the Contact Us Google Sheet
const readContactUsGoogleSheet = async (req, res) => {
  // Parsed Format
  let links;
  try {
    links = await getSheetLinks();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching latest links" });
    return;
  }
  const contactUsGoogleSheetLink = links?.contactUsSheetBest;
  fetch(contactUsGoogleSheetLink)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error("Error reading data:", error);
      res.status(500).json({ error: "Error reading data" });
    });
};

// adding new email in the contact us google sheet
const addContactUsEmailInGoogleSheet = async (req, res) => {
  const { data } = req.body;
  //console.log("What we got from frontend:", req.body);
  let links;
  try {
    links = await getSheetLinks();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching latest links" });
    return;
  }
  const contactUsGoogleSheetLink = links?.contactUsSheetBest;

  fetch(contactUsGoogleSheetLink, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // The response comes here
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
      res.status(500).json({ error: "Error adding data" });
    });
};
// ***************** Contact us APIs Ends Here ***********************************

// ***************** Join us APIs Starts Here ************************************
const addJoinUsDataInGoogleSheet = async (req, res) => {
  const { data: rawData } = req.body;
  const data = rawData ? normalizeRecruitmentData(rawData) : rawData;
  // console.log("What we got from frontend:", req.body);
  let links;
  try {
    links = await getSheetLinks();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching latest links" });
    return;
  }
  const joinUsGoogleSheetLink = getJoinUsSheetBestLink(
    links,
    data?.department
  );

  if (!joinUsGoogleSheetLink) {
    return res.status(400).json({
      error: "No Join Us Sheet.best API link configured",
      department: data?.department,
    });
  }

  fetch(joinUsGoogleSheetLink, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // The response comes here
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
      res.status(500).json({ error: "Error adding data" });
    });
};

const readJoinUsDataFromGoogleSheet = async (req, res) => {
  // Latest Links
  let links;
  try {
    links = await getSheetLinks();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching latest links" });
    return;
  }
  const keys = Object.keys(links.whatsAppGroupLinks);
  const whatsAppGroupLinks = {};
  for (let key of keys) {
    whatsAppGroupLinks[key] = links.whatsAppGroupLinks[key].url;
  }
  const joinUsGoogleSheetLinks = getAllJoinUsSheetBestLinks(links);

  if (!joinUsGoogleSheetLinks.length) {
    return res
      .status(400)
      .json({ error: "No Join Us Sheet.best API links configured" });
  }

  try {
    const sheetData = await Promise.all(
      joinUsGoogleSheetLinks.map(async (joinUsGoogleSheetLink) => {
        const response = await fetch(joinUsGoogleSheetLink);
        return response.json();
      })
    );

    res.status(200).json(sheetData.flat());
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Error reading data" });
  }
};

// API to send email to join our whatsapp group
const sendWhatsAppJoinEmail = async (req, res) => {
  // const whatsAppGroupLinks = {
  //   management: "https://chat.whatsapp.com/KGPTyNobdEo0JLdTGFJUUD",
  //   design: "https://chat.whatsapp.com/BnwJJghc5khFwTHJZYRzuz",
  //   competitive_programming: "https://chat.whatsapp.com/E2woNYDyh7jKBTstOFdwNJ",
  //   social_media_and_content:
  //     "https://chat.whatsapp.com/Lc8A1ORlw6iBtfZJBFsVSN",
  //   marketing_and_outreach: "https://chat.whatsapp.com/Hmg8fTV4Cta8iwOOTRm14C",
  //   web_development: "https://chat.whatsapp.com/DAPi9yWLvlj8tD0LJpGUhV",
  //   finance: "https://chat.whatsapp.com/JG3Ct1HieNEEUixCIivGhv",
  //   projects: "https://chat.whatsapp.com/DsKkYsXdBM76rpdWq1FwUg",
  // };
  let links;
  try {
    links = await getSheetLinks();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching latest links" });
    return;
  }
  const keys = Object.keys(links.whatsAppGroupLinks);
  const whatsAppGroupLinks = {};
  for (let key of keys) {
    whatsAppGroupLinks[key] = links.whatsAppGroupLinks[key].url;
  }

  const { vit_email, department, name } = req.body;
  console.log("Whatsapp group : ", req.body);

  if (!vit_email) {
    return res.status(400).json({ error: "Please Provide Email" });
  }

  if (!whatsAppGroupLinks[department]) {
    return res
      .status(400)
      .json({ error: "Invalid department", givenDept: department });
  }

  try {
    const mailOptions = {
      from: "codechef.vitcc@gmail.com",
      to: vit_email,
      subject: "Join Our WhatsApp Group",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #e0fbfc;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    background-color: #3d5a80;
                    border-radius: 10px;
                    color: white;
                    padding: 10px 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content p {
                    color: #555555;
                    text-align: left;
                    line-height: 1.4;
                }
                .join-btn {
                    display: inline-block;
                    margin: 20px 0;
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: white;
                    text-decoration: none;
                    border-radius: 10px;
                    font-size: 16px;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    color: #777777;
                }
                .footer a {
                    color: #007bff;
                    text-decoration: none;
                }
                .social-media {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                }
                .social-icon {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                }
                .social-icon img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                }
                .social-icon:hover img {
                    transform: scale(1.1);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🌟 Join Our Vibrant Community!</h1>
                </div>
                <div class="content">
                    <h2>Welcome to CodeChef!</h2>
                    <p>Thank you ${name} for filling out our requirement form. At CodeChef, we're all about innovation, passion, and camaraderie. Whether you're a first-year explorer or a seasoned senior, our doors are open to everyone who's eager to dive into the world of Competitive Programming. We're excited to introduce you to our various departments and sub-departments, where you can find your niche and contribute to meaningful projects.</p>
                    <p>Click the button below to join our WhatsApp group and stay updated with our latest activities and announcements regarding requirement.</p>
                    <a href="${whatsAppGroupLinks[department]}" class="join-btn">Join WhatsApp Group</a>
                </div>
                <div class="footer">
                    <p>Follow us on social media:</p>
                    <div class="social-media">
                        <a href="https://www.linkedin.com/company/codechef-vit-chennai-chapter/" target="_blank" class="social-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn">
                        </a>
                        <a href="https://www.instagram.com/codechef.vitc/" target="_blank" class="social-icon">
                            <img src="https://res.cloudinary.com/dxu5hlgvd/image/upload/v1720083181/instagram_mqplcc.png" alt="Instagram">
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(400).json({ message: "email not sent" });
      } else {
        console.log("Email sent", info.response);
        return res.status(200).json({ message: "email sent Successfully" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
// exporting the functions
module.exports = {
  readContactUsGoogleSheet,
  addContactUsEmailInGoogleSheet,
  readJoinUsDataFromGoogleSheet,
  addJoinUsDataInGoogleSheet,
  sendWhatsAppJoinEmail,
};
