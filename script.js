// Function to generate 12 installments with leading zeros
function fillInstallments(selectElement) {
    if (!selectElement) return;
    let options = '';
    for (let i = 1; i <= 12; i++) {
        const num = i.toString().padStart(2, '0');
        options += `<option value="Installment ${num}">Installment ${num}</option>`;
    }
    selectElement.innerHTML = options;
}

// Ensure the form exists before adding listeners
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    fillInstallments(document.querySelector('.installment'));

    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const now = new Date();
        const dateCode = now.toISOString().split('T')[0].replace(/-/g, '');
        const receiptNo = `PAN${dateCode}${Math.floor(1000 + Math.random() * 9000)}`;

        const studentId = document.getElementById('studentId').value || "-";
        const paymentDate = document.getElementById('paymentDate').value ||
            now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        const rows = document.querySelectorAll('.payment-row');
        const paymentItems = Array.from(rows).map(row => ({
            month: row.querySelector('.month').value,
            installment: row.querySelector('.installment').value,
            amount: parseFloat(row.querySelector('.amount').value).toFixed(2)
        }));

        const receiptData = {
            receiptNo: receiptNo,
            date: paymentDate,
            paymentType: document.getElementById('paymentType').value,
            studentId: studentId,
            studentName: document.getElementById('studentName').value,
            batch: document.getElementById('batch').value,
            items: paymentItems,
            penalty: parseFloat(document.getElementById('penalty').value).toFixed(2)
        };

        localStorage.setItem('currentReceipt', JSON.stringify(receiptData));
        window.location.href = 'bill.html'; // Ensure this filename is correct
    });
}