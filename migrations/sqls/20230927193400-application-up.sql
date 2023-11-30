/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS application(
    id SERIAL,
    batch_id INT PRIMARY KEY,
    link VARCHAR(100) NOT NULL,
    closure_date DATE DEFAULT '1/18/2019',
    instructions VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
