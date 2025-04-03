// script.js
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    
    dateElement.textContent = formattedDate;
}

// Function to update greeting based on time of day
function updateGreeting() {
    const greetingElement = document.querySelector('.greeting');
    const hour = new Date().getHours();
    
    let greeting;
    if (hour < 12) {
        greeting = 'Good Morning,';
    } else if (hour < 18) {
        greeting = 'Good Afternoon,';
    } else {
        greeting = 'Good Evening,';
    }
    
    greetingElement.textContent = greeting;
}

// Function to handle proceeding to tracker page
function proceedToTrackerPage(e) {
    if (e) {
        e.preventDefault();
    }
    
    // Store current financial data in localStorage
    const financialData = {
        userName: document.getElementById('welcomeMessage').textContent,
        remainingMoney: document.getElementById('remainingMoney').textContent.replace('$', ''),
        moneySpentToday: document.getElementById('moneySpentToday').textContent.replace('$', ''),
        date: document.getElementById('currentDate').textContent
    };
    
    localStorage.setItem('financialData', JSON.stringify(financialData));
    
    // Navigate to the second page
    window.location.href = 'budget-tracker.html';
}

// Load real financial data from localStorage (instead of demo data)
function loadRealFinancialData() {
    try {
        // Try to load budget data from localStorage
        const budgetData = localStorage.getItem('budgetData');
        
        if (budgetData) {
            const data = JSON.parse(budgetData);
            
            // Set remaining money
            if (data.remainingMoney !== undefined) {
                document.getElementById('remainingMoney').textContent = '$' + parseFloat(data.remainingMoney).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            } else {
                document.getElementById('remainingMoney').textContent = '$0.00';
            }
            
            // Set money spent today (total expenses)
            if (data.totalExpenses !== undefined) {
                document.getElementById('moneySpentToday').textContent = '$' + parseFloat(data.totalExpenses).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            } else {
                document.getElementById('moneySpentToday').textContent = '$0.00';
            }
            
            // Update performance text based on spending habits
            updatePerformanceIndicator(data);
        } else {
            // If no budget data exists yet, show zeros
            document.getElementById('remainingMoney').textContent = '$0.00';
            document.getElementById('moneySpentToday').textContent = '$0.00';
        }
    } catch (error) {
        console.error('Error loading budget data:', error);
        // Fallback to zeros if there's an error
        document.getElementById('remainingMoney').textContent = '$0.00';
        document.getElementById('moneySpentToday').textContent = '$0.00';
    }
}

// Update performance indicator based on real spending data
function updatePerformanceIndicator(data) {
    const performanceText = document.getElementById('performanceText');
    
    if (!data.dailyBudget || data.dailyBudget <= 0) {
        performanceText.textContent = "Set a daily budget to track your performance!";
        return;
    }
    
    const totalExpenses = data.totalExpenses || 0;
    const dailyBudget = data.dailyBudget || 0;
    
    // Calculate spending as percentage of budget
    const spendingRatio = totalExpenses / dailyBudget;
    
    if (spendingRatio <= 0.6) {
        performanceText.textContent = "Your financial management is excellent!";
    } else if (spendingRatio <= 0.8) {
        performanceText.textContent = "Your spending is within budget. Good job!";
    } else if (spendingRatio <= 1.0) {
        performanceText.textContent = "You're staying within your budget.";
    } else {
        performanceText.textContent = "You've exceeded your daily budget. Try to adjust your spending.";
    }
}

// Initialize the dashboard
function initDashboard() {
    updateDate();
    updateGreeting();
    loadRealFinancialData(); // Load real data instead of demo data
    
    // Add event listener to the proceed button
    document.querySelector('.proceed-btn').addEventListener('click', proceedToTrackerPage);
}

// Run initialization when document is loaded
document.addEventListener('DOMContentLoaded', initDashboard);