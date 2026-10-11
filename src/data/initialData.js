// src/data/initialData.js
// Synthetic seed data for College Course & Student Management System

// ---- Course Data (18 courses, 15 active, 3 inactive) ----
export const initialCourses = [
  { id: 'c1', courseCode: 'BCS101', courseName: 'Web Technology', faculty: 'Dr. A', credits: 4, active: true },
  { id: 'c2', courseCode: 'BCS102', courseName: 'DBMS', faculty: 'Dr. B', credits: 4, active: true },
  { id: 'c3', courseCode: 'BCS103', courseName: 'Artificial Intelligence', faculty: 'Dr. C', credits: 3, active: true },
  { id: 'c4', courseCode: 'BCS104', courseName: 'Data Structures', faculty: 'Dr. D', credits: 4, active: true },
  { id: 'c5', courseCode: 'BCS105', courseName: 'Operating Systems', faculty: 'Dr. E', credits: 3, active: true },
  { id: 'c6', courseCode: 'BCS106', courseName: 'Computer Networks', faculty: 'Dr. F', credits: 3, active: true },
  { id: 'c7', courseCode: 'BCS107', courseName: 'Software Engineering', faculty: 'Dr. G', credits: 4, active: true },
  { id: 'c8', courseCode: 'BCS108', courseName: 'Machine Learning', faculty: 'Dr. H', credits: 3, active: true },
  { id: 'c9', courseCode: 'BCS109', courseName: 'Cloud Computing', faculty: 'Dr. I', credits: 3, active: true },
  { id: 'c10', courseCode: 'BCS110', courseName: 'Cyber Security', faculty: 'Dr. J', credits: 3, active: true },
  { id: 'c11', courseCode: 'BCS111', courseName: 'Mobile App Development', faculty: 'Dr. K', credits: 4, active: true },
  { id: 'c12', courseCode: 'BCS112', courseName: 'Digital Electronics', faculty: 'Dr. L', credits: 3, active: true },
  { id: 'c13', courseCode: 'BCS113', courseName: 'Discrete Mathematics', faculty: 'Dr. M', credits: 4, active: true },
  { id: 'c14', courseCode: 'BCS114', courseName: 'Theory of Computation', faculty: 'Dr. N', credits: 3, active: true },
  { id: 'c15', courseCode: 'BCS115', courseName: 'Compiler Design', faculty: 'Dr. O', credits: 3, active: true },
  { id: 'c16', courseCode: 'BCS116', courseName: 'Embedded Systems', faculty: 'Dr. P', credits: 3, active: false },
  { id: 'c17', courseCode: 'BCS117', courseName: 'Parallel Computing', faculty: 'Dr. Q', credits: 3, active: false },
  { id: 'c18', courseCode: 'BCS118', courseName: 'Quantum Computing', faculty: 'Dr. R', credits: 3, active: false },
];

// ---- Student Data (250 students, average attendance = 82%) ----
const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan',
  'Krishna', 'Ishaan', 'Shaurya', 'Atharva', 'Advait', 'Dhruv', 'Kabir',
  'Ritvik', 'Aarush', 'Kian', 'Darsh', 'Veer', 'Rahul', 'Amit', 'Priya',
  'Sneha', 'Ananya', 'Diya', 'Isha', 'Kavya', 'Meera', 'Nisha', 'Pooja',
  'Riya', 'Sakshi', 'Tanvi', 'Zara', 'Neha', 'Simran', 'Aisha', 'Kriti',
  'Lavanya', 'Mansi', 'Nikita', 'Palak', 'Radhika', 'Sanya', 'Tanya',
  'Uma', 'Vidya', 'Yashi', 'Divya',
];

const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Joshi', 'Mehta',
  'Shah', 'Reddy', 'Nair', 'Iyer', 'Rao', 'Das', 'Bose', 'Sen', 'Pillai',
  'Mishra', 'Pandey', 'Trivedi', 'Desai', 'Kulkarni', 'Thakur', 'Chauhan',
  'Malhotra',
];

const subjectPool = [
  'Web Technology', 'DBMS', 'Artificial Intelligence', 'Data Structures',
  'Operating Systems', 'Computer Networks', 'Software Engineering',
  'Machine Learning', 'Cloud Computing', 'Cyber Security',
  'Discrete Mathematics', 'Theory of Computation', 'Compiler Design',
];

const courseNames = initialCourses.map(c => c.courseName);
const genders = ['Male', 'Female'];

// Seeded pseudo-random for reproducibility
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function pickRandom(arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function generateSubjects() {
  const count = 3 + Math.floor(rand() * 3); // 3 to 5 subjects
  const shuffled = [...subjectPool].sort(() => rand() - 0.5);
  return shuffled.slice(0, count).map(name => ({
    name,
    marks: Math.floor(rand() * 51) + 50, // 50-100
  }));
}

// Generate 249 students with random attendance, then calculate 250th to hit avg=82
const TARGET_AVG = 82;
const TOTAL_STUDENTS = 250;
const TARGET_SUM = TARGET_AVG * TOTAL_STUDENTS; // 20500

const tempStudents = [];
let attendanceSum = 0;

for (let i = 1; i <= TOTAL_STUDENTS - 1; i++) {
  const fn = pickRandom(firstNames);
  const ln = pickRandom(lastNames);
  const attendance = Math.floor(rand() * 41) + 60; // 60-100 range to keep realistic
  attendanceSum += attendance;

  tempStudents.push({
    id: `s${i}`,
    name: `${fn} ${ln}`,
    enrollmentNumber: `ENR${String(i).padStart(3, '0')}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@college.edu`,
    course: pickRandom(courseNames),
    semester: Math.floor(rand() * 8) + 1,
    gender: pickRandom(genders),
    attendance,
    subjects: generateSubjects(),
  });
}

// 250th student: calculate attendance to hit exact average
const lastAttendance = Math.max(0, Math.min(100, TARGET_SUM - attendanceSum));
const fn250 = 'Rahul';
const ln250 = 'Sharma';

tempStudents.push({
  id: `s${TOTAL_STUDENTS}`,
  name: `${fn250} ${ln250}`,
  enrollmentNumber: `ENR${String(TOTAL_STUDENTS).padStart(3, '0')}`,
  email: 'rahul.sharma250@college.edu',
  course: 'Web Technology',
  semester: 5,
  gender: 'Male',
  attendance: lastAttendance,
  subjects: [
    { name: 'Web Technology', marks: 85 },
    { name: 'DBMS', marks: 90 },
    { name: 'Artificial Intelligence', marks: 78 },
  ],
});

export const initialStudents = tempStudents;
