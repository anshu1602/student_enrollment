const form = document.getElementById('studentForm');
const rollNoInput = document.getElementById('rollNo');
const inputs = form.querySelectorAll('input:not(#rollNo)');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');
const resetBtn = document.getElementById('resetBtn');

function resetForm() {
    form.reset();
    inputs.forEach(input => input.disabled = true);
    saveBtn.disabled = true;
    updateBtn.disabled = true;
    resetBtn.disabled = true;
    rollNoInput.disabled = false;
    rollNoInput.focus();
    clearErrors();
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(span => span.textContent = '');
}

function validateForm() {
    let isValid = true;
    clearErrors();

    if (!rollNoInput.value.trim()) {
        document.getElementById('rollNoError').textContent = 'Roll No. is required';
        isValid = false;
    }
    if (!document.getElementById('fullName').value.trim()) {
        document.getElementById('fullNameError').textContent = 'Full Name is required';
        isValid = false;
    }
    if (!document.getElementById('class').value.trim()) {
        document.getElementById('classError').textContent = 'Class is required';
        isValid = false;
    }
    if (!document.getElementById('birthDate').value) {
        document.getElementById('birthDateError').textContent = 'Birth Date is required';
        isValid = false;
    }
    if (!document.getElementById('address').value.trim()) {
        document.getElementById('addressError').textContent = 'Address is required';
        isValid = false;
    }
    if (!document.getElementById('enrollmentDate').value) {
        document.getElementById('enrollmentDateError').textContent = 'Enrollment Date is required';
        isValid = false;
    }

    return isValid;
}

function checkRollNo() {
    const rollNo = rollNoInput.value.trim();
    if (rollNo) {
        fetch('student_operations.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=check&rollNo=${encodeURIComponent(rollNo)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                // Record exists
                document.getElementById('fullName').value = data.record.full_name;
                document.getElementById('class').value = data.record.class;
                document.getElementById('birthDate').value = data.record.birth_date;
                document.getElementById('address').value = data.record.address;
                document.getElementById('enrollmentDate').value = data.record.enrollment_date;

                rollNoInput.disabled = true;
                inputs.forEach(input => input.disabled = false);
                updateBtn.disabled = false;
                resetBtn.disabled = false;
                document.getElementById('fullName').focus();
            } else {
                // New record
                inputs.forEach(input => input.disabled = false);
                saveBtn.disabled = false;
                resetBtn.disabled = false;
                document.getElementById('fullName').focus();
            }
        })
        .catch(error => {
            console.error('Error checking rollNo:', error);
            alert('Error checking rollNo.');
        });
    }
}

rollNoInput.addEventListener('blur', checkRollNo);

saveBtn.addEventListener('click', function () {
    if (validateForm()) {
        const formData = new FormData();
        formData.append('action', 'save');
        formData.append('rollNo', rollNoInput.value.trim());
        formData.append('fullName', document.getElementById('fullName').value.trim());
        formData.append('class', document.getElementById('class').value.trim());
        formData.append('birthDate', document.getElementById('birthDate').value);
        formData.append('address', document.getElementById('address').value.trim());
        formData.append('enrollmentDate', document.getElementById('enrollmentDate').value);

        fetch('student_operations.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Record saved successfully!');
                resetForm();
            } else {
                alert('Error saving record: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error saving record:', error);
            alert('Error saving record.');
        });
    }
});

updateBtn.addEventListener('click', function () {
    if (validateForm()) {
        const formData = new FormData();
        formData.append('action', 'update');
        formData.append('rollNo', rollNoInput.value.trim());
        formData.append('fullName', document.getElementById('fullName').value.trim());
        formData.append('class', document.getElementById('class').value.trim());
        formData.append('birthDate', document.getElementById('birthDate').value);
        formData.append('address', document.getElementById('address').value.trim());
        formData.append('enrollmentDate', document.getElementById('enrollmentDate').value);

        fetch('student_operations.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Record updated successfully!');
                resetForm();
            } else {
                alert('Error updating record: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error updating record:', error);
            alert('Error updating record.');
        });
    }
});

resetBtn.addEventListener('click', resetForm);

// Initialize form on page load
resetForm();