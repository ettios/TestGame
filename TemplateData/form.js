async function showModalForm() {
    const { value: formValues, isConfirmed } = await Swal.fire({
        title: 'Feedback',
        html:
            '<div class="input-container"><label>Name</label><input required id="name-input" class="swal2-input" placeholder="Name"/></div>' +
            '<div class="input-container"><label>Email</label><input required type="email" id="email-input" class="swal2-input" placeholder="Email"/></div>' +
            '<div class="input-container"><label>Comment</label><textarea required id="message-input" class="swal2-input" placeholder="Comment"/></textarea></div>',
        focusConfirm: false,
        confirmButtonText: 'Send',
        preConfirm: () => {
            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const message = document.getElementById('message-input').value;            

            // Realizar validación de campos aquí
            if (!name || !email || !message) {
                Swal.showValidationMessage('Please fill in all fields');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Swal.showValidationMessage('Please enter a valid email address');
                return false;
            }

            return { name, email, message };
        },
    });

    if (isConfirmed) {
        // Realizar el fetch aquí después de la validación
        try {
            const response = await fetch('https://services-gg.ettios.io/api/v1/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                Swal.fire('Success', 'Form submitted successfully', 'success');
            } else {
                Swal.fire('Error', 'Failed to submit form', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'An error occurred while submitting the form', 'error');
        }
    }
}
