const addApplicant = `
 INSERT INTO applicants (
    email,
    firstname,
    lastname,
    password,
    phonenumber
 )
 VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, email, created_at
`;

const findApplicantByEmail = `
 SELECT id,firstname, lastname, email, password FROM applicants WHERE email=$1
`;

// fetch all applicants from the db
const fetchAllApplicants = 'SELECT firstname, lastname, email FROM applicants';

// fetch applicants by id from db
const fetchApplicantById = 'SELECT id, firstname, lastname, email FROM applicants WHERE id=$1';

const applicantImgSrc = `
UPDATE applicants
SET applicant_image=$2
WHERE email=$1 
RETURNING firstname, lastname, applicant_image
`;

// set applicant document url
const applicantDocumentSrc = ` 
UPDATE applicants 
SET applicants_docs=$2
WHERE email=$1
RETURNING firstname, lastname, applicants_docs`;

// set applicant document to db
const applicantDetails = ` 
UPDATE applicants
SET address=$1, 
course=$2,
university=$3,
cgpa=$4,
dob=$5
WHERE email=$6
RETURNING firstname, lastname, email`;

// set applicant batch id
const setApplicantBatchId = ` 
UPDATE applicants
SET batch=$2
WHERE email=$1
RETURNING email, batch`;

module.exports = {
  addApplicant,
  findApplicantByEmail,
  fetchAllApplicants,
  fetchApplicantById,
  applicantImgSrc,
  applicantDocumentSrc,
  applicantDetails,
  setApplicantBatchId,
};
