CREATE TABLE cvs (
    id SERIAL PRIMARY KEY,
    filename TEXT,
    data bytea,
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    dateOfBirth DATE,
    email text,
    phone varchar(15),
    location VARCHAR(255),
    minSalary integer,
    maxSalary integer,
    -- jobType integer check (job_type >= 0 AND job_type <= 4), 
    jobType TEXT,
    skills VARCHAR(50)[],
    about text
);