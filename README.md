# Student Enrollment Form

A web application to manage student enrollment records using HTML, JavaScript, PHP, and MySQL.

## Features
- Add new student records with Roll No., Full Name, Class, Birth Date, Address, and Enrollment Date.
- Update existing records.
- Validate inputs to prevent empty fields.
- Store data in a MySQL database (`school_db`, `student_table`).

## Setup
1. Install XAMPP and start Apache/MySQL.
2. Create a MySQL database `school_db` and table `student_table` (see SQL below).
3. Place files in `C:\xampp\htdocs\student_enrollment`.
4. Access `http://localhost/student_enrollment/student_enrollment.html`.

## Database Schema
```sql
CREATE DATABASE school_db;
USE school_db;
CREATE TABLE student_table (
    roll_no VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    class VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(200) NOT NULL,
    enrollment_date DATE NOT NULL
);
