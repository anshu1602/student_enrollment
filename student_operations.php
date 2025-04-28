<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "school_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Handle requests
$action = $_POST['action'] ?? '';

if ($action === 'check') {
    $rollNo = $_POST['rollNo'] ?? '';
    $stmt = $conn->prepare("SELECT * FROM student_table WHERE roll_no = ?");
    $stmt->bind_param("s", $rollNo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $record = $result->fetch_assoc();
        echo json_encode(['exists' => true, 'record' => [
            'full_name' => $record['full_name'],
            'class' => $record['class'],
            'birth_date' => $record['birth_date'],
            'address' => $record['address'],
            'enrollment_date' => $record['enrollment_date']
        ]]);
    } else {
        echo json_encode(['exists' => false]);
    }
    $stmt->close();
} elseif ($action === 'save') {
    $rollNo = $_POST['rollNo'] ?? '';
    $fullName = $_POST['fullName'] ?? '';
    $class = $_POST['class'] ?? '';
    $birthDate = $_POST['birthDate'] ?? '';
    $address = $_POST['address'] ?? '';
    $enrollmentDate = $_POST['enrollmentDate'] ?? '';

    $stmt = $conn->prepare("INSERT INTO student_table (roll_no, full_name, class, birth_date, address, enrollment_date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $rollNo, $fullName, $class, $birthDate, $address, $enrollmentDate);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error saving record: ' . $stmt->error]);
    }
    $stmt->close();
} elseif ($action === 'update') {
    $rollNo = $_POST['rollNo'] ?? '';
    $fullName = $_POST['fullName'] ?? '';
    $class = $_POST['class'] ?? '';
    $birthDate = $_POST['birthDate'] ?? '';
    $address = $_POST['address'] ?? '';
    $enrollmentDate = $_POST['enrollmentDate'] ?? '';

    $stmt = $conn->prepare("UPDATE student_table SET full_name = ?, class = ?, birth_date = ?, address = ?, enrollment_date = ? WHERE roll_no = ?");
    $stmt->bind_param("ssssss", $fullName, $class, $birthDate, $address, $enrollmentDate, $rollNo);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating record: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

$conn->close();
?>