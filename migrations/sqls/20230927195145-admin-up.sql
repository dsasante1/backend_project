/* Replace with your SQL commands */
CREATE TYPE role AS ENUM('admin', 'user');


CREATE TABLE IF NOT EXISTS admin(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    admin_image VARCHAR,
    role_type role DEFAULT 'admin',
    phonenumber VARCHAR(15) DEFAULT 0,
    address VARCHAR(100) DEFAULT 'area',
    password VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
