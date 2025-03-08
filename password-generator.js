document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordOutput = document.getElementById('password-output');
    const lengthRange = document.getElementById('length-range');
    const lengthValue = document.getElementById('length-value');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    // Checkboxes
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');

    // Character Sets
    const charset = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Update length value display
    lengthRange.addEventListener('input', () => {
        lengthValue.textContent = lengthRange.value;
        if (passwordOutput.value) {
            generatePassword();
        }
    });

    // Generate password when any checkbox is clicked
    [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (passwordOutput.value) {
                generatePassword();
            }
        });
    });

    // Generate Password Function
    function generatePassword() {
        let chars = '';
        let password = '';

        // Get selected character sets
        if (uppercaseCheck.checked) chars += charset.uppercase;
        if (lowercaseCheck.checked) chars += charset.lowercase;
        if (numbersCheck.checked) chars += charset.numbers;
        if (symbolsCheck.checked) chars += charset.symbols;

        // Validate at least one character set is selected
        if (!chars) {
            alert('Please select at least one character type!');
            return;
        }

        // Generate password
        const length = parseInt(lengthRange.value);
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Ensure password contains at least one character from each selected set
        if (uppercaseCheck.checked && !/[A-Z]/.test(password)) return generatePassword();
        if (lowercaseCheck.checked && !/[a-z]/.test(password)) return generatePassword();
        if (numbersCheck.checked && !/[0-9]/.test(password)) return generatePassword();
        if (symbolsCheck.checked && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) return generatePassword();

        passwordOutput.value = password;
        updateStrengthMeter(password);
    }

    // Update Strength Meter
    function updateStrengthMeter(password) {
        let strength = 0;
        const checks = {
            length: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
            noRepeating: !/(.)\1{2,}/.test(password)
        };

        // Calculate strength
        strength += checks.length ? 25 : 0;
        strength += (checks.uppercase && checks.lowercase) ? 25 : 0;
        strength += checks.numbers ? 20 : 0;
        strength += checks.symbols ? 20 : 0;
        strength += checks.noRepeating ? 10 : 0;

        // Update UI
        strengthFill.style.width = strength + '%';
        
        // Set color based on strength
        if (strength < 40) {
            strengthFill.style.background = '#dc3545';
            strengthText.textContent = 'Weak';
        } else if (strength < 70) {
            strengthFill.style.background = '#ffc107';
            strengthText.textContent = 'Moderate';
        } else {
            strengthFill.style.background = '#28a745';
            strengthText.textContent = 'Strong';
        }
    }

    // Copy password to clipboard
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(passwordOutput.value);
            copyBtn.classList.add('copy-success');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.classList.remove('copy-success');
                copyBtn.innerHTML = originalHTML;
            }, 1500);
        } catch (err) {
            alert('Failed to copy password!');
        }
    }

    // Event Listeners
    generateBtn.addEventListener('click', generatePassword);
    refreshBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);

    // Generate initial password
    generatePassword();
});
