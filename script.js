const teacherAuthorization = {
  "Dr. Rao": ["CSE-A", "CSE-B"],
  "Ms. Anjali": ["ECE-A"],
  "Mr. Suresh": ["CSE-C"]
};
// Splash screen
setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}, 3500);

// Teacher list
const teachers = [
  "Dr. Rao",
  "Ms. Anjali",
  "Mr. Suresh"
];

// Class-wise student data
const classData = {
  "CSE-A": [
    { name: "Ayaan", phone: "9876543210" },
    { name: "Sara", phone: "9123456780" },
    { name: "Rahul", phone: "9988776655" }
  ],
  "CSE-B": [
    { name: "Meena", phone: "9012345678" },
    { name: "Arjun", phone: "9345678123" }
  ],
  "ECE-A": [
    { name: "Kiran", phone: "8899001122" },
    { name: "Pooja", phone: "7766554433" }
  ]
};

let currentTeacher = "";
let currentClass = "";

// Populate dropdowns
window.onload = () => {
  const teacherSelect = document.getElementById("teacherName");
  const classSelect = document.getElementById("className");

  teachers.forEach(t => {
    teacherSelect.innerHTML += `<option value="${t}">${t}</option>`;
  });

  Object.keys(classData).forEach(cls => {
    classSelect.innerHTML += `<option value="${cls}">${cls}</option>`;
  });
};

function openClass() {
  currentTeacher = document.getElementById("teacherName").value;
  currentClass = document.getElementById("className").value;

  if (!currentTeacher || !currentClass) {
    alert("Please select Teacher and Class");
    return;
  }

  // SECURITY CHECK
  const allowedClasses = teacherAuthorization[currentTeacher];
  if (!allowedClasses || !allowedClasses.includes(currentClass)) {
    alert("You are not authorized to mark attendance for this class ❌");
    return;
  }

  document.getElementById("classSelection").classList.add("hidden");
  document.getElementById("attendanceSection").classList.remove("hidden");

  document.getElementById("classTitle").innerText =
    `${currentClass} | Teacher: ${currentTeacher}`;

  loadStudents();
}
function loadStudents() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  classData[currentClass].forEach(student => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <a href="#student-${student.name}-${student.phone}"
           onclick="openProfile('${student.name}','${student.phone}')">
          ${student.name}
        </a>
      </td>
      <td>
        <button class="status-btn present"
          onclick="toggleStatus(this)">Present</button>
      </td>
      <td>
        <span class="dots" onclick="togglePast(this)">...</span>
        <div class="hidden">Previous attendance</div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleStatus(btn) {
  if (btn.innerText === "Present") {
    btn.innerText = "Absent";
    btn.className = "status-btn absent";
  } else {
    btn.innerText = "Present";
    btn.className = "status-btn present";
  }
}

function togglePast(el) {
  el.nextElementSibling.classList.toggle("hidden");
}

function openProfile(name, phone) {
  document.getElementById("attendanceSection").classList.add("hidden");
  const profile = document.getElementById("studentProfile");
  profile.classList.remove("hidden");

  profile.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Class:</strong> ${currentClass}</p>
    <p><strong>Teacher:</strong> ${currentTeacher}</p>
    <p><strong>Phone:</strong> ${phone}</p>

    <button onclick="calculateMonthly('${name}')">
      Monthly Attendance
    </button>
    <br><br>
    <button onclick="backToClass()">⬅ Back</button>
  `;
}

function calculateMonthly(name) {
  alert(`${name} has 86% attendance this month 📊`);
}

function backToClass() {
  document.getElementById("studentProfile").classList.add("hidden");
  document.getElementById("attendanceSection").classList.remove("hidden");
}
function disableEditing() {
  document
    .querySelectorAll(".status-btn, .buttons button")
    .forEach(btn => btn.disabled = true);
}
