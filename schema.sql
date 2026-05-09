CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- Sample data
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'Mathura Road, New Delhi', 28.5672, 77.2410),
('St. Xavier''s School', 'Connaught Place, New Delhi', 28.6315, 77.2167),
('Modern School', 'Barakhamba Road, New Delhi', 28.6328, 77.2264),
('Ryan International School', 'Vasant Kunj, New Delhi', 28.5245, 77.1555),
('Kendriya Vidyalaya', 'RK Puram, New Delhi', 28.5639, 77.1712),
('Sanskriti School', 'Chanakyapuri, New Delhi', 28.5885, 77.1780),
('The Shri Ram School', 'Vasant Vihar, New Delhi', 28.5590, 77.1610),
('Lotus Valley School', 'Noida, Uttar Pradesh', 28.5355, 77.3910),
('Amity International School', 'Saket, New Delhi', 28.5244, 77.2090),
('Springdales School', 'Pusa Road, New Delhi', 28.6402, 77.1826);
