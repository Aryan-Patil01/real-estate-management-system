-- ============================================================
--  UrbanNest — Sample Data Seed File
--  10 properties | 5 cities | 3 types
--  Run this in MySQL Workbench on your real_estate_db
-- ============================================================

USE real_estate_db;

-- ============================================================
--  STEP 1: Clear existing test data (optional)
--  Uncomment these lines if you want a fresh start
-- ============================================================

-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE property_images;
-- TRUNCATE TABLE bookings;
-- TRUNCATE TABLE properties;
-- TRUNCATE TABLE users;
-- SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
--  STEP 2: Seed Agent users
--  Plain text password for both: Agent@123
-- ============================================================

INSERT INTO users (name, email, password, role) VALUES
('Rahul Sharma',  'rahul@urbannest.com',  '$2b$10$wSRBMBbSrWLGKFHtzDpfeeHyBuDyMcPsLLkMqXt1JbWfgEqWVWvYa', 'agent'),
('Priya Nair',    'priya@urbannest.com',  '$2b$10$wSRBMBbSrWLGKFHtzDpfeeHyBuDyMcPsLLkMqXt1JbWfgEqWVWvYa', 'agent');

-- ============================================================
--  STEP 3: 10 Sample Properties
-- ============================================================

INSERT INTO properties (name, description, location, city, price, type, rooms, availability, contact, agent_id)
VALUES

-- MUMBAI
('Skyline Residency',
 'Luxurious high-rise apartment in Bandra West with stunning sea views, rooftop pool, gymnasium, and 24/7 security. Modern interiors with premium Italian marble flooring and smart home features.',
 'Bandra West', 'Mumbai', 25000000, 'Apartment', 3, 'available', '+91 98201 11001',
 (SELECT id FROM users WHERE email = 'rahul@urbannest.com')),

('Marine Crown Villa',
 'Elegant sea-facing villa in Juhu with a private garden, home theatre, modular kitchen, and spacious living areas. Perfect for families seeking premium coastal living in Mumbai.',
 'Juhu', 'Mumbai', 85000000, 'Villa', 5, 'available', '+91 98201 22002',
 (SELECT id FROM users WHERE email = 'priya@urbannest.com')),

-- DELHI
('Capital Heights',
 'Premium 3BHK apartment in South Extension with top-end finishes, dedicated parking, and excellent metro connectivity. Close to top schools, hospitals, and shopping centres.',
 'South Extension', 'Delhi', 18000000, 'Apartment', 3, 'available', '+91 98110 33003',
 (SELECT id FROM users WHERE email = 'priya@urbannest.com')),

('Green Meadows Bungalow',
 'Spacious independent bungalow in Vasant Vihar with a lush garden, servant quarters, modular kitchen, and a large terrace. One of Delhi most prestigious residential addresses.',
 'Vasant Vihar', 'Delhi', 120000000, 'Bungalow', 6, 'available', '+91 98110 44004',
 (SELECT id FROM users WHERE email = 'rahul@urbannest.com')),

-- BANGALORE
('Tech Park Residences',
 'Smart apartment minutes from Electronic City and major IT parks. Features home automation, co-working lounge, EV charging, and a beautifully landscaped courtyard.',
 'Electronic City', 'Bangalore', 9500000, 'Apartment', 2, 'available', '+91 98440 55005',
 (SELECT id FROM users WHERE email = 'rahul@urbannest.com')),

('Whitefield Grande Villa',
 'Luxurious gated villa in Whitefield with a private pool, landscaped garden, Italian marble flooring, and a dedicated home office. Minutes from ITPL and Nexus Whitefield Mall.',
 'Whitefield', 'Bangalore', 45000000, 'Villa', 4, 'available', '+91 98440 66006',
 (SELECT id FROM users WHERE email = 'priya@urbannest.com')),

-- HYDERABAD
('Hitech Hub Apartments',
 'Contemporary apartment in HITEC City with city skyline views, fully equipped gym, swimming pool, and seamless access to major IT corridors. Ideal for tech professionals.',
 'HITEC City', 'Hyderabad', 11000000, 'Apartment', 3, 'available', '+91 98490 77007',
 (SELECT id FROM users WHERE email = 'rahul@urbannest.com')),

('Pearl Bungalow Estate',
 'Stunning independent bungalow in Jubilee Hills with a home theatre, private terrace garden, imported flooring, 3-car garage, and premium fittings. Hyderabad finest address.',
 'Jubilee Hills', 'Hyderabad', 75000000, 'Bungalow', 5, 'available', '+91 98490 88008',
 (SELECT id FROM users WHERE email = 'priya@urbannest.com')),

-- PUNE
('Koregaon Comfort Homes',
 'Well-designed apartment in Koregaon Park close to restaurants, cafes, and nightlife. Includes a clubhouse, rooftop lounge, and ample parking in one of Pune trendiest localities.',
 'Koregaon Park', 'Pune', 8500000, 'Apartment', 2, 'available', '+91 98220 99009',
 (SELECT id FROM users WHERE email = 'priya@urbannest.com')),

('Lavasa Hillside Retreat',
 'Scenic villa near Lavasa with panoramic Sahyadri hill views, open deck, indoor fireplace, and a private driveway. A peaceful escape from city life with luxury at every corner.',
 'Lavasa', 'Pune', 32000000, 'Villa', 4, 'available', '+91 98220 10010',
 (SELECT id FROM users WHERE email = 'rahul@urbannest.com'));

-- ============================================================
--  STEP 4: Property Images (real Unsplash URLs)
-- ============================================================

INSERT INTO property_images (property_id, image_url)
VALUES
-- Skyline Residency - Mumbai Apartment
((SELECT id FROM properties WHERE name = 'Skyline Residency'),
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop'),

-- Marine Crown Villa - Mumbai Villa
((SELECT id FROM properties WHERE name = 'Marine Crown Villa'),
 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop'),

-- Capital Heights - Delhi Apartment
((SELECT id FROM properties WHERE name = 'Capital Heights'),
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop'),

-- Green Meadows Bungalow - Delhi Bungalow
((SELECT id FROM properties WHERE name = 'Green Meadows Bungalow'),
 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop'),

-- Tech Park Residences - Bangalore Apartment
((SELECT id FROM properties WHERE name = 'Tech Park Residences'),
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop'),

-- Whitefield Grande Villa - Bangalore Villa
((SELECT id FROM properties WHERE name = 'Whitefield Grande Villa'),
 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop'),

-- Hitech Hub Apartments - Hyderabad Apartment
((SELECT id FROM properties WHERE name = 'Hitech Hub Apartments'),
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop'),

-- Pearl Bungalow Estate - Hyderabad Bungalow
((SELECT id FROM properties WHERE name = 'Pearl Bungalow Estate'),
 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop'),

-- Koregaon Comfort Homes - Pune Apartment
((SELECT id FROM properties WHERE name = 'Koregaon Comfort Homes'),
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop'),

-- Lavasa Hillside Retreat - Pune Villa
((SELECT id FROM properties WHERE name = 'Lavasa Hillside Retreat'),
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop');

-- ============================================================
--  Verify: SELECT * FROM properties;
--          SELECT * FROM property_images;
-- ============================================================
