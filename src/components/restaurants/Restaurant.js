
        function showSection(section) {
            // Hide all sections
            document.getElementById('restaurant-section').classList.add('d-none');
            document.getElementById('owner-section').classList.add('d-none');
            document.getElementById('documents-section').classList.add('d-none');
            
            // Show selected section
            document.getElementById(section + '-section').classList.remove('d-none');
            
            // Update active navigation item
            document.querySelectorAll('.list-group-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Find and activate the corresponding nav item
            if (section === 'restaurant') {
                document.querySelector('.list-group-item:nth-child(1)').classList.add('active');
                updateProgressBar(33);
            } else if (section === 'owner') {
                document.querySelector('.list-group-item:nth-child(2)').classList.add('active');
                updateProgressBar(66);
            } else if (section === 'documents') {
                document.querySelector('.list-group-item:nth-child(3)').classList.add('active');
                updateProgressBar(100);
            }
        }
        
        function updateProgressBar(percentage) {
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.width = percentage + '%';
            progressBar.setAttribute('aria-valuenow', percentage);
            
            const progressText = document.querySelector('.progress ~ p');
            if (percentage === 33) {
                progressText.textContent = 'Step 1 of 3 completed';
            } else if (percentage === 66) {
                progressText.textContent = 'Step 2 of 3 completed';
            } else {
                progressText.textContent = 'Step 3 of 3 completed';
            }
        }
