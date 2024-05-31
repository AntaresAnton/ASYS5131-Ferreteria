window.onload = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');
    const amount = queryParams.get('amount');
    const buyOrder = queryParams.get('buy_order');
    const transactionDate = queryParams.get('transaction_date');

    document.getElementById('status').textContent = status;
    document.getElementById('amount').textContent = amount;
    document.getElementById('buyOrder').textContent = buyOrder;
    document.getElementById('transactionDate').textContent = transactionDate;
};
