        // Filtering function
        function filterPrograms(status) {
            const programs = document.querySelectorAll('.program-card');
            const filterButtons = document.querySelectorAll('.filter-btn');

            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the selected button
            event.currentTarget.classList.add('active');

            programs.forEach(program => {
                if (status === 'all') {
                    program.style.display = 'block';
                } else {
                    if (status === 'open' && program.classList.contains('open')) {
                        program.style.display = 'block';
                    } else if (status === 'closed' && program.classList.contains('closed')) {
                        program.style.display = 'block';
                    } else {
                        program.style.display = 'none';
                    }
                }
            });
        }

        // Show all programs on page load
        document.addEventListener('DOMContentLoaded', () => {
            filterPrograms.call(document.querySelector('.filter-btn.active'), 'all');
        });
