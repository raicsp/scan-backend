const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' })); 
app.use(cors()); 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scan',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});


// Register endpoint
app.post('/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Check if email already exists
  const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      return res.status(400).send('Email already in use');
    }

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 8);

    const insertSql = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    db.query(insertSql, [firstname, lastname, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).send('Server error');
      }
      console.log('User registered:', result);
      res.status(201).send('User registered');
    });
  });
});


// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE BINARY email = ?'; // Case-sensitive email comparison
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user.id
    });
  });
});






// Update profile endpoint

const teacherImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../scan/teacherimages');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const id = req.params.id;
    const filename = `${id}.jpg`;
    cb(null, filename);
  },
});


// Function to handle base64 image data
const handleBase64Image = (imageBase64) => {
  return new Promise((resolve, reject) => {
    if (!imageBase64) {
      return resolve(null); // No image to process
    }
  
    const base64Data = imageBase64.split(',')[1]; // Extract base64 part only
    const imageBuffer = Buffer.from(base64Data, 'base64');
    resolve(imageBuffer);
  });
};

const uploadTeacherImage = multer({ storage: teacherImageStorage }).single('profilePic');

app.put('/update-profile/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, imageBase64 } = req.body;

  // Ensure all required fields are provided
  if (!firstname || !lastname || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Decode base64 image
    const profilePicBuffer = await handleBase64Image(imageBase64);

    // Update profile in the database
    const sql = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, profile_pic = ? WHERE id = ?';
    const params = [
      firstname,
      lastname,
      email,
      profilePicBuffer ? profilePicBuffer : null, // Handle null case for no image
      id
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({
        message: 'Profile updated successfully',
        data: {
          id,
          firstname,
          lastname,
          email,
          profilePic: profilePicBuffer ? 'Image updated' : 'No image'
        },
      });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(400).json({ error: 'Invalid image data' });
  }
});


//updat student
app.put('/update-student-data/:studentID', async (req, res) => {
  const { studentID } = req.params;
  const { name, gmail, profile_pic, p_name, parent_contact } = req.body;

  // Log request headers, params, and body for debugging
  console.log('Request headers:', req.headers);
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);

  // Ensure required fields are provided
  if (!name || !gmail || !p_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Parse parent contact number and validate
  let parentContactInt = null; // Default to null
  if (parent_contact) {
    parentContactInt = parseInt(parent_contact, 10);
    if (isNaN(parentContactInt) || parentContactInt <= 0) {
      return res.status(400).json({ error: 'Invalid contact number format' });
    }
  }

  try {
    // Handle image if provided
    let profilePicBuffer = null;
    if (profile_pic) {
      console.log('Profile Pic before decoding:', profile_pic); // Log base64 image
      profilePicBuffer = await handleBase64Image(profile_pic);
      console.log('Decoded Profile Pic Buffer:', profilePicBuffer); // Log buffer
    }

    const sql = `UPDATE student SET 
      name = COALESCE(?, name), 
      gmail = COALESCE(?, gmail), 
      profile_pic = COALESCE(?, profile_pic), 
      p_name = COALESCE(?, p_name), 
      parent_contact = COALESCE(?, parent_contact) 
      WHERE studentID = ?`;

    const params = [
      name,
      gmail,
      profilePicBuffer, // This can still be null if no image is provided
      p_name,
      parentContactInt, // This will be null if invalid
      studentID
    ];

    // Execute SQL query
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Check if any rows were affected (student found)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json({
        message: 'Student updated successfully',
        data: {
          studentID,
          name,
          gmail,
          profilePic: profilePicBuffer ? 'Image updated' : 'No image',
          p_name,
          parent_contact: parentContactInt
        },
      });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(400).json({ error: 'Invalid image data' });
  }
});


//check email
app.get('/check-email', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }

    if (results[0].count > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    res.status(200).json({ message: 'Email is available' });
  });
});


//Add student

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = '../scan/studentimages';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.name}.jpg`);
  }
});

const upload = multer({ storage: storage });

app.post('/add-student', upload.single('profilePic'), (req, res) => {
  const { name, gmail, gender, id } = req.body;
  const profilePic = req.file ? req.file.filename : null;

  // Insert student data into database
  const sql = 'INSERT INTO student (name, gmail, gender, profile_pic, teacher_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, gmail, gender, profilePic, id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to register student' });
    }

    res.status(201).json({
      status: 'success',
      message: 'Student registered successfully',
      data: { name, gmail, gender, profilePic }
    });
  });
});

//get student
// Fetch students with attendance status for today
app.get('/students/:id', (req, res) => {
  const teacherId = req.params.id;

  const sql = `
SELECT s.*, a.status AS attendanceStatus
FROM student s
LEFT JOIN (
  SELECT studentID, status
  FROM attendance
  WHERE date = CURDATE()
) a ON s.studentID = a.studentID
WHERE s.teacher_id = ?
`;

  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch students' });
    }
    res.status(200).json({ status: 'success', data: results });
  });
});

//fetch grade and section
app.get('/classes', (req, res) => {
  const teacherId = req.query.teacherId; // Get teacherId from query parameters

  if (!teacherId) {
      return res.status(400).json({ error: 'Teacher ID is required' });
  }

  const query = 'SELECT `class_id`, `grade_level`, `section` FROM `classes` WHERE `assigned_teacher_id` = ?';

  db.query(query, [teacherId], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Database query error' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'No class found for the given teacher ID' });
      }

      res.json(result[0]); // Assuming the teacher is assigned to only one class
  });
});

// Fetch students and their attendance by teacherId
app.get('/students/:teacherId', (req, res) => {
  const { teacherId } = req.params;
  console.log('Fetching students for teacher ID:', teacherId); // Log teacher ID

  const sql = `
    SELECT s.*, a.status AS attendance_status
    FROM student s
    LEFT JOIN attendance a ON s.id = a.student_id
    WHERE s.teacher_id = ?
  `;

  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch students' });
    }

    // Process the results to ensure profile_pic is returned as Base64
    const formattedResults = results.map(student => ({
      ...student,
      profile_pic: student.profile_pic
        ? `data:image/jpeg;base64,${student.profile_pic.toString('base64')}`  // Convert Buffer to Base64 string
        : null, // Handle case where there's no profile pic
    }));

    console.log('Formatted query results:', formattedResults); // Log formatted results
    
    res.status(200).json({
      status: 'success',
      data: formattedResults,
    });
  });
});


// Delete student endpoint
// Verify password and delete student endpoint
app.post('/verify-password-and-delete', (req, res) => {
  const { userId, password, studentID } = req.body;

  // Fetch the user's hashed password from the database
  const sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', message: 'Incorrect password' });
    }

    // Delete the student if the password is correct
    const deleteSql = 'DELETE FROM student WHERE studentID = ?';
    db.query(deleteSql, [studentID], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).json({ status: 'error', message: 'Failed to delete student' });
      }
      res.status(200).json({ status: 'success', message: 'Student deleted successfully' });
    });
  });
});


// Endpoint to check and update attendance
app.post('/update-attendance', (req, res) => {
  const { teacherId } = req.body;
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  
  // Query to fetch students and their attendance for the current date
  const fetchSql = `
    SELECT s.studentID AS studentId, 
      s.name, 
      s.gmail, 
      s.gender, 
      s.profile_pic, 
      s.parent_contact, 
      s.p_name,
      a.status
    FROM student s
    LEFT JOIN attendance a ON s.studentID = a.studentID AND a.date = CURDATE()
    WHERE s.teacher_id = ?;
  `;

  db.query(fetchSql, [teacherId], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch students' });
    }

    // Iterate through results and update attendance if necessary
    const updates = results.map(student => {
      if (!student.status) {
        // Mark as absent if no attendance record exists for the current date
        return new Promise((resolve, reject) => {
          const insertSql = 'INSERT INTO attendance (studentID, date, status) VALUES (?, ?, ?)';
          db.query(insertSql, [student.studentID, currentDate, 'Absent'], (err, result) => {
            if (err) {
              console.error('SQL error:', err);
              return reject(err);
            }
            resolve();
          });
        });
      }
      return Promise.resolve();
    });

    Promise.all(updates)
      .then(() => {
        res.status(200).json({
          status: 'success',
          data: results.map(student => ({
            ...student,
            status: student.status || 'Absent',
          })),
        });
      })
      .catch(err => {
        console.error('Error updating attendance:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update attendance' });
      });
  });
});

//update attendance status
app.post('/update-student-status', (req, res) => {
  console.log('Received request to update status:', req.body);
  const { studentId, newStatus } = req.body;
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  console.log(`Updating studentID: ${studentId}, newStatus: ${newStatus}, date: ${currentDate}`);

  const updateSql = `
    UPDATE attendance
    SET status = ?
    WHERE studentID = ? AND date = CURDATE();
  `;

  db.query(updateSql, [newStatus, studentId], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to update attendance status' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'No record found to update' });
    }
    res.status(200).json({ status: 'success', message: 'Attendance status updated' });
  });
});

// Change password endpoint
app.put('/change-password/:id', (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Fetch the user's current password from the database
  const sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Current password is incorrect');
    }

    // Hash the new password before storing it in the database
    const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
    const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(updateSql, [hashedNewPassword, id], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).send('Server error');
      }
      res.status(200).send('Password changed successfully');
    });
  });
});


//dashboard
app.get('/attendance/today', (req, res) => {
  const teacherId = req.query.teacherId;

  const presentQuery = `
    SELECT COUNT(*) AS present
    FROM attendance
    WHERE status = 'Present' AND date = CURDATE() AND studentID IN (
      SELECT studentID
      FROM student
      WHERE teacher_Id = ?
    );
  `;

  const lateQuery = `
    SELECT COUNT(*) AS late
    FROM attendance
    WHERE status = 'Late' AND date = CURDATE() AND studentID IN (
      SELECT studentID
      FROM student
      WHERE teacher_Id = ?
    );
  `;

  const absentQuery = `
    SELECT COUNT(*) AS absent
    FROM attendance
    WHERE status = 'Absent' AND date = CURDATE() AND studentID IN (
      SELECT studentID
      FROM student
      WHERE teacher_Id = ?
    );
  `;

  const totalQuery = `
    SELECT COUNT(*) AS total
    FROM student
    WHERE teacher_Id = ?;
  `;

  const genderQuery = `
    SELECT gender, COUNT(*) AS count
    FROM student
    WHERE teacher_Id = ?
    GROUP BY gender;
  `;

  db.query(presentQuery, [teacherId], (err, presentResult) => {
    if (err) {
      return res.status(500).send(err);
    }
    db.query(lateQuery, [teacherId], (err, lateResult) => {
      if (err) {
        return res.status(500).send(err);
      }
      db.query(absentQuery, [teacherId], (err, absentResult) => {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(totalQuery, [teacherId], (err, totalResult) => {
          if (err) {
            return res.status(500).send(err);
          }
          db.query(genderQuery, [teacherId], (err, genderResult) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.json({
              present: presentResult[0].present,
              late: lateResult[0].late,
              absent: absentResult[0].absent,
              total: totalResult[0].total,
              gender: genderResult
            });
          });
        });
      });
    });
  });
});

app.get('/attendance/daily', (req, res) => {
  const teacherId = req.query.teacherId;

  const dailyAttendanceQuery = `
    SELECT DATE_FORMAT(date, '%a') AS day, COUNT(*) AS presentCount
    FROM attendance
    WHERE status = 'Present' AND WEEK(date) = WEEK(CURDATE()) AND studentID IN (
      SELECT studentID
      FROM student
      WHERE teacher_Id = ?
    )
    GROUP BY day;
  `;

  db.query(dailyAttendanceQuery, [teacherId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get('/attendance/weekly', (req, res) => {
  const teacherId = req.query.teacherId;

  const weeklyQuery = `
    SELECT CONCAT('Week ', WEEK(date)) AS week, COUNT(*) AS presentCount
    FROM attendance
    WHERE status = 'present' AND MONTH(date) = MONTH(CURDATE()) AND studentID IN (SELECT studentID FROM student WHERE teacher_Id = ?)
    GROUP BY week;
  `;

  db.query(weeklyQuery, [teacherId], (err, weeklyResult) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(weeklyResult);
  });
});

app.get('/attendance/monthly', (req, res) => {
  const teacherId = req.query.teacherId;

  const weeklyQuery = `
   SELECT DATE_FORMAT(date, '%b') AS month, COUNT(*) AS presentCount
FROM attendance
WHERE status = 'present' 
  AND YEAR(date) = YEAR(CURDATE()) 
  AND studentID IN (SELECT studentID FROM student WHERE teacher_Id = 1)
GROUP BY MONTH(date) -- Grouping by the numeric representation of the month
ORDER BY MONTH(date);
  `;

  db.query(weeklyQuery, [teacherId], (err, weeklyResult) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(weeklyResult);
  });
});


// Endpoint for fetching filtered students
app.get('/students/:id/filter', (req, res) => {
  const teacherId = req.params.id;
  const { startDate, endDate } = req.query;

  // Adjust SQL query to use startDate and endDate
  const sql = `
SELECT s.*, a.date AS attendanceDate, a.status AS attendanceStatus
FROM student s
LEFT JOIN (
  SELECT studentID, date, status
  FROM attendance
  WHERE date BETWEEN ? AND ?
) a ON s.studentID = a.studentID
WHERE s.teacher_id = ?

  `;

  db.query(sql, [startDate, endDate, teacherId], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch filtered students' });
    }
    res.status(200).json({ status: 'success', data: results });
  });
});



//Dasboard top late,absent,present
const getStudentAttendance = (status) => (req, res) => {
  const teacherId = req.query.teacher_Id;
  const statusColumn = `${status}_count`;
  const statusCondition = status.charAt(0).toUpperCase() + status.slice(1);

  const sql = `
    SELECT s.studentID, s.name AS student_name, 
           COUNT(a.status) AS ${statusColumn}
    FROM attendance a
    JOIN student s ON a.studentID = s.studentID
    WHERE a.status = ? AND s.teacher_Id = ?
    GROUP BY s.studentID, s.name
    ORDER BY ${statusColumn} DESC
    LIMIT 5;
  `;

  db.query(sql, [statusCondition, teacherId], (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: `Failed to fetch most ${status} students` });
    }
    res.status(200).json({ status: 'success', data: results });
  });
};

app.get('/attendance/most-late-student', getStudentAttendance('late'));
app.get('/attendance/most-present-student', getStudentAttendance('present'));
app.get('/attendance/most-absent-student', getStudentAttendance('absent'));


//filter
const getDateRange = (filter) => {
  const today = new Date();
  let startDate = new Date();
  let endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the current month

  if (filter === 'week') {
    startDate.setDate(today.getDate() - today.getDay()); // Start of the week
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End of the week
  } else if (filter === 'month') {
    startDate.setDate(1); // Start of the month
  }

  return [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]];
};

const createStudentFilterRoute = (status) => (req, res) => {
  const teacherId = req.query.teacher_Id;
  const filter = req.query.filter; // 'week' or 'month'
  const [startDate, endDate] = getDateRange(filter);

  const sql = `
    SELECT s.studentID, s.name AS student_name, 
           COUNT(a.status) AS ${status}_count
    FROM attendance a
    JOIN student s ON a.studentID = s.studentID
    WHERE a.status = ? AND s.teacher_Id = ?
    AND a.date BETWEEN ? AND ?
    GROUP BY s.studentID, s.name
    ORDER BY ${status}_count DESC;
  `;

  db.query(sql, [status.charAt(0).toUpperCase() + status.slice(1), teacherId, startDate, endDate], (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: `Failed to fetch most ${status} students` });
    }
    res.status(200).json({ status: 'success', data: results });
  });
};

app.get('/attendance/most-late-student-filter', createStudentFilterRoute('late'));
app.get('/attendance/most-present-student-filter', createStudentFilterRoute('present'));
app.get('/attendance/most-absent-student-filter', createStudentFilterRoute('absent'));




// Route to handle student addition
app.post('/add-students', (req, res) => {
  const { name, imageBase64 } = req.body;

  if (!name || !imageBase64) {
    return res.status(400).json({ error: 'Name and image are required' });
  }

  try {
    // Ensure imageBase64 is in proper format
    const base64Data = imageBase64.split(',')[1]; // Extract base64 part only

    // Decode Base64 image
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Insert data into MySQL database
    const query = 'INSERT INTO student (name, profile_pic) VALUES (?, ?)';
    db.query(query, [name, imageBuffer], (err, results) => {
      if (err) {
        console.error('Error inserting student into database:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ success: true, studentId: results.insertId });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(400).json({ error: 'Invalid image data' });
  }
});

app.get('/profile/:id', (req, res) => {

  const userId = req.params.id;

  // SQL query to fetch user profile
  const sql = 'SELECT id, firstname, lastname, email, profile_pic FROM users WHERE id = ?';
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = results[0];
    
    // Assuming `profile_pic` is stored as a Base64 string
    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilePic: user.profile_pic // Include the Base64 image here
    });
  });
});

// notifications
app.get('/notifications', (req, res) => {
  const teacherId = req.query.teacherId;
  
  if (!teacherId) {
    return res.status(400).json({ error: 'teacherId is required' });
  }

  // Query for students who are absent for more than 1 day and have no notification sent
  const query = `
    SELECT student.studentID, student.name, COUNT(attendance.status) AS absence_count 
    FROM attendance 
    JOIN student ON attendance.studentID = student.studentID 
    WHERE student.teacher_Id = ? 
      AND attendance.status = 'Absent' 
      AND student.notif IS NULL
    GROUP BY attendance.studentID
    HAVING absence_count > 1;
  `;

  db.query(query, [teacherId], (err, results) => {
    if (err) throw err;

    // Create notification messages and include studentId
    const notifications = results.map(row => ({
      studentId: row.studentID,  // Include studentID in the response
      message: `${row.name} has been absent for ${row.absence_count} days.`
    }));

    // Respond with the notification array
    res.json(notifications);
  });
});



//update notif status
app.put('/students/:studentId/notif', async (req, res) => {
  const { studentId } = req.params;
  const { notif } = req.body;

  try {
    await db.query('UPDATE student SET notif = ? WHERE studentID = ?', [notif, studentId]);
    res.status(200).send('Notification updated successfully');
  } catch (error) {
    res.status(500).send('Error updating notification');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});