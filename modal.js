const openBtn = document.getElementById('openCalculatorBtn');
const closeBtn = document.getElementById('closeCalculatorBtn');
const modal = document.getElementById('calculatorModal');
const qtyInput = document.getElementById('qtyInput');
const calcOutput = document.getElementById('calcOutput');
const continueBtn = document.getElementById('continueBtn');
const whatsappBtn = document.getElementById('whatsappBtn');

const planSelect = document.getElementById('planSelect');
const calcPage1 = document.getElementById('calcPage1');
const calcPage2 = document.getElementById('calcPage2');

function openModal(showCalcPage = true, preSelectedPlan = null) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (showCalcPage) {
    calcPage1.style.display = 'block';
    calcPage2.style.display = 'none';
    planSelect.disabled = false;
  } else {
    calcPage1.style.display = 'none';
    calcPage2.style.display = 'block';
    if (preSelectedPlan) {
      planSelect.value = preSelectedPlan;
      planSelect.disabled = true;
    }
  }
}

// openBtn.onclick = () => openModal(true);

closeBtn.onclick = () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  planSelect.disabled = false;
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    planSelect.disabled = false;
  }
};

// Select plan from buttons
const planButtons = document.querySelectorAll('.plan-select-btn');
planButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedPlan = btn.getAttribute('data-plan');
    openModal(false, selectedPlan);
  });
});

qtyInput.addEventListener('input', function () {
  const qty = parseInt(this.value);
  if (!isNaN(qty)) {
    const base = 0.17, print = 0.07;
    const basic = qty * (base + print * 0.5);
    const premium = qty * (base + print);
    const custom = qty * (base + print + 0.02);
    calcOutput.textContent = `Basic: ₹${basic.toFixed(2)} | Premium: ₹${premium.toFixed(2)} | Custom: ₹${custom.toFixed(2)}`;
  }
});

continueBtn.onclick = () => {
  calcPage1.style.display = 'none';
  calcPage2.style.display = 'block';
};

whatsappBtn.onclick = () => {
  const name = document.getElementById('nameInput').value;
  const business = document.getElementById('businessInput').value;
  const contact = document.getElementById('contactInput').value;
  const city = document.getElementById('cityInput').value;
  const plan = planSelect.value;

  const message = `Hello, I am reaching out to inquire about your ${plan} cup marketing plan.
Name: ${name}
Business: ${business}
Location: ${city}
Interested Plan: ${plan}
Contact: ${contact}`;
  window.open(`https://wa.me/919819796036?text=${encodeURIComponent(message)}`, '_blank');
};
