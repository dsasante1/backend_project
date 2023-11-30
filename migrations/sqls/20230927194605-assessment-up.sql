/* Replace with your SQL commands */
CREATE TYPE exam_status AS ENUM('pending', 'done');

CREATE TABLE IF NOT EXISTS assesment(
    id SERIAL PRIMARY KEY,
    batch INT REFERENCES application(batch_id) ON DELETE CASCADE,
    question json NOT NULL,
    timer INT DEFAULT 90,
    date_computed DATE DEFAULT '1/18/2002',
    number_of_questions INT DEFAULT 30,
    exams exam_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
