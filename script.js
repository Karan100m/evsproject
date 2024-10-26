let footprintData = [];

function calculateFootprint() {
    const milesDriven = document.getElementById('milesDriven').value;
    const electricityUsage = document.getElementById('electricityUsage').value;
    const meatConsumption = document.getElementById('meatConsumption').value;

    // Sample calculations
    const carbonFromDriving = milesDriven * 0.404; // CO2 emissions per mile
    const carbonFromElectricity = electricityUsage * 0.92; // CO2 emissions per kWh
    const carbonFromMeat = meatConsumption * 0.5; // Approximate CO2 emissions per serving

    const totalFootprint = (carbonFromDriving + carbonFromElectricity + carbonFromMeat).toFixed(2);
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your estimated carbon footprint is: <strong>${totalFootprint} kg CO2</strong> per month.`;

    // Display personalized tips
    displayTips(totalFootprint);
    
    // Save result for progress tracking
    footprintData.push(totalFootprint);
    document.getElementById('shareBtn').classList.remove('hidden');

    // Draw the chart
    drawProgressChart();
}

function displayTips(footprint) {
    const tipsDiv = document.getElementById('personalizedTips');
    tipsDiv.innerHTML = '';

    if (footprint < 100) {
        tipsDiv.innerHTML = `<p>Great job! Keep up the good work in maintaining a low carbon footprint.</p>`;
    } else if (footprint < 200) {
        tipsDiv.innerHTML = `<p>Consider reducing meat consumption and using public transport more often.</p>`;
    } else {
        tipsDiv.innerHTML = `<p>You might want to look into more sustainable options, like carpooling and renewable energy sources.</p>`;
    }
}

function shareResults() {
    const result = document.getElementById('result').innerHTML;
    const url = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`I calculated my carbon footprint: ${result}`);
    
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${url}`, '_blank');
}

// Chart.js for tracking progress
function drawProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: footprintData.map((_, index) => `Month ${index + 1}`),
            datasets: [{
                label: 'Carbon Footprint (kg CO2)',
                data: footprintData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
