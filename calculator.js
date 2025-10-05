document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const numCupsInput = document.getElementById('numCups');
    const planInput = document.getElementById('plan');
    const calculateBtn = document.getElementById('calculateBtn');

    const totalBudgetElement = document.getElementById('total-budget');
    const estimatedReachElement = document.getElementById('estimated-reach');
    const costPerPersonElement = document.getElementById('cost-per-person');
    const estimatedConversionsElement = document.getElementById('estimated-conversions');
    const costPerConversionElement = document.getElementById('cost-per-conversion');

    const resultsSection = document.getElementById('results');
    const chartsSection = document.getElementById('charts');
    
     
     
    // Set initial chart data
    const reachChart = new Chart(document.getElementById('reachChart'), {
        type: 'bar',
        data: {
            labels: ['Cup Marketing', 'Traditional Marketing', 'Digital Marketing' ],
            datasets: [{
                label: 'Reach per ₹',
                data: [planInput.value, 3.5 ,6 ], // 1.4 for Cup Marketing, 0.1 for Traditional Marketing (₹10 per person)
                backgroundColor: ['#388E3C', '#F57C00 ' , '#1976D2'],
                borderColor: ['#388E3C', '#F57C00  ' , '#1565C0'], // Darker shades for the border
                borderWidth: 2,
                borderRadius: 12,
            }]
        },
        options: {
            responsive: true,
            interaction:{
                mode:'nearest',
                intersect:false
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min:0.1,
                    title:{
                        display:true,
                        text:'Reach per ₹'
                    },
                    ticks:{
                        stepsize:1
                    }
                }
            },
            plugins:{
                tooltip:{
                    enabled:true,
                    backgroundColor:'black',
                    titleColor:'white',
                    bodyColor:'white',
                    bodyFont:{
                        size:14
                    }
                },
                legend:{
                    display:true,
                    labels:{
                        font:{
                            size:14
                        }
                    }
                }
            }
        }
    });

    // const budgetChart = new Chart(document.getElementById('budgetChart'), {
    //     type: 'pie',
    //     data: {
    //         labels: ['Cups' , 'Traditional Marketing' , 'Digital Marketing'],
    //         datasets: [{
    //             label:"Timing in seconds ",
    //             data: [86.5, 10.5, 3.0],
    //             backgroundColor: [
    //                 '#4CAF50',
    //                 '#FF9800',
    //                 '#2196F3'
    //             ],
    //             borderWidth: 2
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         plugins: {
    //             legend: {
    //                 position: 'top',
    //             },
    //             tooltip: {
    //                 callbacks: {
    //                     label: function(tooltipItem) {
    //                         return tooltipItem.raw + '%';
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });

    const budgetChart = new Chart(document.getElementById('budgetChart'), {
        type: 'doughnut',
        data: {
            labels: ['Cups', 'Traditional Marketing', 'Digital Marketing'],
            datasets: [{
                data: [86, 11,3],
                backgroundColor: ['#4CAF50', '#FF9800' , '#2196F3'],
                borderWidth: 2,

            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // Function to perform the calculations
    function calculate() {
        const cups = parseInt(numCupsInput.value);
        const planCost = parseFloat(planInput.value);
 
        // Calculations
        const totalBudget = cups * planCost;
        const estimatedReach = cups * 1.4; // Assuming 1.4 people per cup
        const costPerPerson = planCost;
        const estimatedConversions = estimatedReach * 0.008; // Assuming 0.8% conversion rate
        const costPerConversion = totalBudget / estimatedConversions;

        // Update the results on the page
        totalBudgetElement.textContent = `₹${totalBudget.toFixed(2)}`;
        estimatedReachElement.textContent = `${cups} - ${estimatedReach.toFixed(0)}`;
        const icon = document.createElement("i");
        icon.classList.add('fa-solid' , 'fa-user');
        estimatedReachElement.appendChild(icon);

        costPerPersonElement.textContent = `₹${ (totalBudget/cups) }-  ₹${ (totalBudget/estimatedReach).toFixed(2)}`;
        // estimatedConversionsElement.textContent = `${estimatedConversions.toFixed(0)}`;
        // costPerConversionElement.textContent = `₹${costPerConversion.toFixed(2)}`;


        const selectedVal = planInput.value;
        reachChart.data.datasets[0].data[0] = selectedVal;
        reachChart.update();

        // Show the results and charts sections
        resultsSection.style.display = 'block';
        chartsSection.style.display = 'flex';
    }

    // Call the calculate function when the button is clicked
    calculateBtn.addEventListener('click',  ()=>{
        if(numCupsInput.value<500000){
            alert("Minimum order quantity is 5,00,000 cups");
            return;
        }else{
            calculate();
        }
    });
});
