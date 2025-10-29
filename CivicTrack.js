// Page navigation
const homePage = document.getElementById('homePage');
const submitPage = document.getElementById('submitPage');
const statusPage = document.getElementById('statusPage');

document.getElementById('goSubmit').onclick = () => {
  homePage.classList.add('hidden');
  submitPage.classList.remove('hidden');
};

document.getElementById('goStatus').onclick = () => {
  homePage.classList.add('hidden');
  statusPage.classList.remove('hidden');
};

document.getElementById('backHome1').onclick = () => {
  submitPage.classList.add('hidden');
  homePage.classList.remove('hidden');
};

document.getElementById('backHome2').onclick = () => {
  statusPage.classList.add('hidden');
  homePage.classList.remove('hidden');
};

// Simulated database
const fakeDB = {};
let complaintCounter = 1;

const form = document.getElementById('complaintForm');
const resultDiv = document.getElementById('submitResult');
const checkBtn = document.getElementById('checkStatusBtn');
const statusResult = document.getElementById('statusResult');

// Handle Complaint Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  const photo = document.getElementById('photo').files[0];

  if (!category || !description || !location) {
    alert('Please fill all required fields.');
    return;
  }

  const id = complaintCounter++;
  const complaint = {
    id,
    category,
    description,
    location,
    status: 'Pending Review',
    submittedAt: new Date(),
    photo: photo ? URL.createObjectURL(photo) : null
  };

  fakeDB[id] = complaint;
  resultDiv.className = 'result success';
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <strong>Complaint submitted successfully!</strong><br>
    Your complaint ID is <b>${id}</b>.<br>
    Use this ID to check your complaint status.
  `;
  form.reset();
});

// Handle Status Check
checkBtn.addEventListener('click', () => {
  const id = document.getElementById('complaintId').value.trim();
  if (!id) { 
    alert('Please enter a complaint ID.'); 
    return; 
  }

  const data = fakeDB[id];
  if (!data) {
    statusResult.className = 'status-result error';
    statusResult.style.display = 'block';
    statusResult.innerHTML = `<b>No complaint found for ID ${id}</b>`;
    return;
  }

  statusResult.className = 'status-result success';
  statusResult.style.display = 'block';
  statusResult.innerHTML = `
    <strong>Complaint ID:</strong> ${data.id}<br>
    <strong>Category:</strong> ${data.category}<br>
    <strong>Description:</strong> ${data.description}<br>
    <strong>Location:</strong> ${data.location}<br>
    <strong>Status:</strong> <b>${data.status}</b><br>
    <strong>Submitted At:</strong> ${new Date(data.submittedAt).toLocaleString()}
    ${data.photo ? `<br><br><img src="${data.photo}" width="100%" style="max-width:300px;border-radius:8px;">` : ''}
  `;
});
