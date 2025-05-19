document.addEventListener('DOMContentLoaded', function() {
  const steps = Array.from(document.querySelectorAll('.creation-step'));
  let currentStep = 0;
  
  // Initialize
  steps[currentStep].classList.add('active');
  
  // Next button
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', goToNextStep);
  });
  
  // Back button
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', goToPrevStep);
  });
  
  // Option selection
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function() {
      const parentStep = this.closest('.creation-step');
      parentStep.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('active');
      });
      this.classList.add('active');
      updateSummary();
    });
  });
  
  // Copy prompt
  document.querySelector('.copy-btn').addEventListener('click', function() {
    const prompt = document.getElementById('ai-prompt');
    prompt.select();
    document.execCommand('copy');
    alert('Prompt copié dans le presse-papiers!');
  });
  
  // Restart
  document.querySelector('.restart-btn').addEventListener('click', function() {
    if (confirm('Recommencer une nouvelle création?')) {
      resetForm();
    }
  });
  
  function goToNextStep() {
    if (currentStep < steps.length - 1) {
      steps[currentStep].classList.remove('active');
      currentStep++;
      steps[currentStep].classList.add('active');
      updateSummary();
    }
  }
  
  function goToPrevStep() {
    if (currentStep > 0) {
      steps[currentStep].classList.remove('active');
      currentStep--;
      steps[currentStep].classList.add('active');
    }
  }
  
  function updateSummary() {
    // Update all summary values based on selections
    const origin = document.querySelector('#origin-step .option-card.active');
    if (origin) {
      document.getElementById('origin-value').textContent = origin.querySelector('span').textContent;
    }
    
    // Update all other values similarly...
    
    // Generate AI prompt
    generateAIPrompt();
  }
  
  function generateAIPrompt() {
    // Get all selected values
    const origin = document.querySelector('#origin-step .option-card.active span')?.textContent || 'non spécifié';
    const age = document.querySelector('#age-step .option-card.active span')?.textContent || 'non spécifié';
    const face = document.querySelector('#face-step .option-card.active span')?.textContent || 'non spécifié';
    const body = document.querySelector('#body-step .option-card.active span')?.textContent || 'non spécifié';
    const chest = document.querySelector('#chest-step .option-card.active span')?.textContent || 'non spécifié';
    const hair = document.querySelector('#hair-length-step .option-card.active span')?.textContent || 'non spécifié';
    
    // Construct prompt
    const prompt = `Une femme ${origin.toLowerCase()} de ${age} ans, visage ${face.toLowerCase()}, ` +
                  `morphologie ${body.toLowerCase()}, poitrine ${chest.toLowerCase()}, ` +
                  `cheveux ${hair.toLowerCase()}.`;
    
    document.getElementById('ai-prompt').value = prompt;
  }
  
  function resetForm() {
    // Reset all selections
    document.querySelectorAll('.option-card').forEach(card => {
      card.classList.remove('active');
    });
    
    // Go back to first step
    steps[currentStep].classList.remove('active');
    currentStep = 0;
    steps[currentStep].classList.add('active');
    
    // Reset summary
    updateSummary();
  }
});
