-- drop table otps;

CREATE TABLE otps
(
    id SERIAL PRIMARY KEY,
    email_id VARCHAR(250) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE
);

-- drop table users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);


select * from otps;
SELECT * FROM users;
SELECT * FROM userVerified;