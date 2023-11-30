/* Replace with your SQL commands */
CREATE TYPE exam_status AS ENUM('pending', 'done');
CREATE TYPE application_status AS ENUM('pending', 'approved', 'declined');

CREATE TABLE IF NOT EXISTS applicants(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    applicant_image VARCHAR,
    applicants_docs VARCHAR,
    password VARCHAR NOT NULL,
    phonenumber VARCHAR(15) DEFAULT 0,
    dob DATE DEFAULT '1/18/2002',
    address VARCHAR(100) DEFAULT 'area',
    university VARCHAR(100) DEFAULT 'school',
    course VARCHAR(100) DEFAULT 'program',
    cgpa NUMERIC DEFAULT 0,
    exam exam_status DEFAULT 'pending',
    application application_status DEFAULT 'pending',
    assesment_score INT DEFAULT 0,
    batch INT REFERENCES application(batch_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
