window.onload = function () {
    const rawData = localStorage.getItem('currentReceipt');
    if (!rawData) {
        console.error("No data found in local storage.");
        return;
    }

    const data = JSON.parse(rawData);

    // 1. Fill Header Details
    const detailsContainer = document.getElementById('receipt-details');
    if (detailsContainer) {
        // Mapping keys to labels for cleaner code
        const details = [
            ["Receipt No:", data.receiptNo],
            ["Date:", data.date],
            ["Payment Type:", data.paymentType],
            ["Student ID:", data.studentId],
            ["Student Name:", data.studentName.toUpperCase()],
            ["Course / Batch:", data.batch]
        ];

        detailsContainer.innerHTML = details.map(item => `
            <div class="detail-row">
                <span class="label">${item[0]}</span>
                <span class="value">${item[1]}</span>
            </div>
        `).join('');
    }

    // 2. Fill Table Rows
    const tableBody = document.getElementById('table-body');
    let subTotal = 0;
    if (tableBody) {
        let tableHtml = "";
        data.items.forEach(item => {
            const amt = parseFloat(item.amount);
            subTotal += amt;
            tableHtml += `
                <tr>
                    <td>${item.month}</td>
                    <td>${item.installment}</td>
                    <td style="text-align: right; font-weight: bold;">
                        ${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = tableHtml;
    }

    // 3. Fill Totals
    const totalsContainer = document.getElementById('totals');
    if (totalsContainer) {
        const penalty = parseFloat(data.penalty) || 0;
        const paidTotal = subTotal + penalty;

        totalsContainer.innerHTML = `
            <div class="total-line">
                <span>Sub Total</span> 
                <span>${subTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="total-line">
                <span>Penalty</span> 
                <span>${penalty.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="total-line highlighted">
                <span>Paid Total</span> 
                <span>${paidTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
        `;
    }
};