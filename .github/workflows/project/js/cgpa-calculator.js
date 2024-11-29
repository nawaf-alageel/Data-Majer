// Function to create dynamic course input fields based on the number of courses
function createCourseFields() {
    var courseCount = parseInt(document.getElementById('courseCount').value);
    var coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = ''; // Clear any existing fields

    if (isNaN(courseCount) || courseCount < 1) {
        return;
    }

    for (var i = 1; i <= courseCount; i++) {
        var courseDiv = document.createElement('div');
        courseDiv.className = 'course';

        var courseTitle = document.createElement('h3');
        courseTitle.textContent = 'Course ' + i;
        courseDiv.appendChild(courseTitle);

        // Course grade input group
        var gradeGroup = document.createElement('div');
        gradeGroup.className = 'input-group';

        var gradeLabel = document.createElement('label');
        gradeLabel.setAttribute('for', 'grade' + i);
        gradeLabel.textContent = 'Course Grade (out of 100):';

        var gradeInput = document.createElement('input');
        gradeInput.type = 'number';
        gradeInput.id = 'grade' + i;
        gradeInput.min = '0';
        gradeInput.max = '100';
        gradeInput.step = '0.01'; // Allow decimals
        gradeInput.placeholder = 'Enter course grade';

        gradeGroup.appendChild(gradeLabel);
        gradeGroup.appendChild(gradeInput);
        courseDiv.appendChild(gradeGroup);

        // Course credits input group
        var creditGroup = document.createElement('div');
        creditGroup.className = 'input-group';

        var creditLabel = document.createElement('label');
        creditLabel.setAttribute('for', 'credit' + i);
        creditLabel.textContent = 'Credits:';

        var creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.id = 'credit' + i;
        creditInput.min = '0';
        creditInput.step = '0.01'; // Allow decimals
        creditInput.placeholder = 'Enter course credits';

        creditGroup.appendChild(creditLabel);
        creditGroup.appendChild(creditInput);
        courseDiv.appendChild(creditGroup);

        coursesContainer.appendChild(courseDiv);
    }
}

// Function to calculate CGPA
function calculateCGPA() {
    var scale = parseFloat(document.getElementById('scale').value); // Grading scale (4, 5, or 100)
    var prevGPA = parseFloat(document.getElementById('prevGPA').value);
    var prevCredits = parseFloat(document.getElementById('prevCredits').value);
    var totalRequiredCredits = parseFloat(document.getElementById('totalRequiredCredits').value);
    var courseCount = parseInt(document.getElementById('courseCount').value);

    var resultDiv = document.getElementById('result');

    // Input validation
    if (isNaN(prevGPA) || prevGPA < 0 || prevGPA > scale) {
        resultDiv.innerHTML = `Please enter a valid previous CGPA (out of ${scale}).`;
        resultDiv.classList.add('show');
        return;
    }

    if (isNaN(prevCredits) || prevCredits < 0) {
        resultDiv.innerHTML = 'Please enter a valid total previous credits.';
        resultDiv.classList.add('show');
        return;
    }

    if (isNaN(totalRequiredCredits) || totalRequiredCredits <= 0) {
        resultDiv.innerHTML = 'Please enter a valid total required credits for graduation.';
        resultDiv.classList.add('show');
        return;
    }

    if (isNaN(courseCount) || courseCount < 1) {
        resultDiv.innerHTML = 'Please enter a valid number of courses.';
        resultDiv.classList.add('show');
        return;
    }

    var totalPointsCurrent = 0;
    var totalCreditsCurrent = 0;

    for (var i = 1; i <= courseCount; i++) {
        var grade = parseFloat(document.getElementById('grade' + i).value);
        var credit = parseFloat(document.getElementById('credit' + i).value);

        if (isNaN(grade) || grade < 0 || grade > 100) {
            resultDiv.innerHTML = `Please enter a valid grade for Course ${i}.`;
            resultDiv.classList.add('show');
            return;
        }

        if (isNaN(credit) || credit <= 0) {
            resultDiv.innerHTML = `Please enter valid credits for Course ${i}.`;
            resultDiv.classList.add('show');
            return;
        }

        var point = gradeToPoint(grade, scale);
        totalPointsCurrent += point * credit;
        totalCreditsCurrent += credit;
    }

    var totalPointsPrevious = prevGPA * prevCredits;
    var totalPointsAll = totalPointsPrevious + totalPointsCurrent;
    var totalCreditsAll = prevCredits + totalCreditsCurrent;

    var cgpa = totalPointsAll / totalCreditsAll;
    cgpa = cgpa.toFixed(2);

    var gpaCurrent = totalPointsCurrent / totalCreditsCurrent;
    gpaCurrent = gpaCurrent.toFixed(2);

    var remainingCredits = totalRequiredCredits - totalCreditsAll;
    remainingCredits = remainingCredits.toFixed(2);

    var resultMessage = `<p>Your Current GPA: <strong>${gpaCurrent}</strong></p>`;
    resultMessage += `<p>Your New CGPA: <strong>${cgpa}</strong></p>`;

    if (remainingCredits > 0) {
        resultMessage += `<p>Remaining Credits for Graduation: <strong>${remainingCredits}</strong></p>`;
    } else {
        resultMessage += `<p>Congratulations! You have completed all required credits for graduation.</p>`;
    }

    resultDiv.innerHTML = resultMessage;
    resultDiv.classList.add('show');
}

// Function to convert grade to point based on the selected scale
function gradeToPoint(grade, scale) {
    if (scale === 100) {
        // Convert percentage grade to a 4.0 scale
        return (grade / 100) * 4;
    } else if (scale === 5) {
        // Convert percentage grade to a 5.0 scale
        return (grade / 100) * 5;
    } else {
        // Default to 4.0 scale
        return (grade / 100) * 4;
    }
}
