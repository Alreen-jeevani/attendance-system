// Splash Screen
setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}, 3500);

// Sample students
const students = ["Ayaan", "Sara", "Rahul", "Meena", "Arjun"];

let currentClass = "";
let teacher = "";

function openClass() {
  teacher = document.getElementById("teacherName").value;
  currentClass = document.getElementById("className").value;

  if (!teacher || !currentClass) {
    alert("Enter Teacher and Class");
    return;
  }

  document.getElementById("classSelection").classList.add("hidden");
  document.getElementById("attendanceSection").classList.remove("hidden");
  document.getElementById("classTitle").innerText =
    `${currentClass} | Teacher: ${teacher}`;

  loadAttendance();
}

function loadAttendance() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  students.forEach(name => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <a href="#student-${name}" onclick="openProfile('${name}')">${name}</a>
      </td>
      <td>
        <button class="status-btn present" onclick="toggleStatus(this)">Present</button>
      </td>
      <td>
        <span class="dots" onclick="togglePast(this)">...</span>
        <div class="hidden">Previous records here</div>
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

function saveAttendance() {
  alert("Attendance saved successfully ✅");
}

function showTodayTotal() {
  const presentCount = document.querySelectorAll(".present").length;
  alert(`Total Present Today: ${presentCount}`);
}

function openProfile(student) {
  document.getElementById("attendanceSection").classList.add("hidden");
  const profile = document.getElementById("studentProfile");
  profile.classList.remove("hidden");

  profile.innerHTML = `
    <h2>${student} Profile</h2>
    <p>Class: ${currentClass}</p>
    <p>Teacher: ${teacher}</p>
    <button onclick="calculateMonthly('${student}')">Monthly Attendance</button>
    <br><br>
    <button onclick="backToClass()">⬅ Back</button>
  `;
}

function calculateMonthly(student) {
  alert(`${student} attended 85% this month 📊`);
}

function backToClass() {
  document.getElementById("studentProfile").classList.add("hidden");
  document.getElementById("attendanceSection").classList.remove("hidden");
}
