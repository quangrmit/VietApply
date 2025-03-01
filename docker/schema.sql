CREATE TABLE cvs (
    id SERIAL PRIMARY KEY,
    filename TEXT,
    data bytea,
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName TEXT,
    middleName TEXT,
    lastName TEXT,
    dateOfBirth DATE,
    email text  unique not null,
    phone varchar(15),
    location VARCHAR(255),
    minSalary integer,
    maxSalary integer,
    -- jobType integer check (job_type >= 0 AND job_type <= 4), 
    jobType VARCHAR(20) CHECK (jobType IN ('full-time', 'part-time', 'contract', 'internship', 'freelance')),
    skills VARCHAR(50)[],
    about text,
    password text
);