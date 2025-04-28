class AddView {
    constructor() {
        this.modal = document.getElementById('add-modal');
        this.container = document.getElementById('add-form-container');
        this.closeBtn = this.modal.querySelector('.close-btn');
    }

    render() {
        const formHTML = `
            <div class="form-container">
                <div class="form-group">
                    <label for="add-website">Website</label>
                    <input type="text" id="add-website" required placeholder="example.com">
                </div>
                <div class="form-group">
                    <label for="add-username">Username</label>
                    <input type="text" id="add-username" required placeholder="username">
                </div>
                <div class="form-group">
                    <label for="add-password">Password</label>
                    <input type="password" id="add-password" required placeholder="••••••••">
                    <div class="password-strength">
                        <div class="password-strength-fill" id="add-strength-bar"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="add-notes">Notes (optional)</label>
                    <input type="text" id="add-notes" placeholder="Additional information">
                </div>
                <div class="modal-actions">
                    <button type="button" class="google-btn secondary" id="cancel-add">Cancel</button>
                    <button type="submit" class="google-btn" id="submit-add">Save</button>
                </div>
            </div>
        `;

        this.container.innerHTML = formHTML;
        this.bindPasswordStrength();
    }

    show() {
        this.modal.style.display = 'flex';
        document.getElementById('add-website').focus();
    }

    hide() {
        this.modal.style.display = 'none';
    }

    clear() {
        const form = this.container.querySelector('div.form-container');
        if (form) {
            form.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            document.getElementById('add-strength-bar').style.width = '0%';
        }
    }

    bindPasswordStrength() {
        const passwordInput = document.getElementById('add-password');
        const strengthBar = document.getElementById('add-strength-bar');
        
        passwordInput.addEventListener('input', () => {
            const strength = this.calculateStrength(passwordInput.value);
            strengthBar.style.width = `${strength.score * 25}%`;
            strengthBar.style.backgroundColor = strength.color;
        });
    }

    calculateStrength(password) {
        let score = 0;
        
        // Length
        if (password.length > 0) score += 1;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        
        // Complexity
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        // Cap at 4
        score = Math.min(score, 4);
        
        // Determine color
        let color;
        if (score < 2) color = '#d93025'; // Red
        else if (score < 4) color = '#f4b400'; // Yellow
        else color = '#0f9d58'; // Green
        
        return { score, color };
    }

    bindAddPassword(handler) {
        const submitBtn = document.getElementById('submit-add');
        submitBtn.addEventListener('click', () => {
            const website = document.getElementById('add-website').value.trim();
            const username = document.getElementById('add-username').value.trim();
            const password = document.getElementById('add-password').value;
            const notes = document.getElementById('add-notes').value.trim();
            
            if (website && username && password) {
                handler({ website, username, password, notes });
            }
        });
    }

    bindCloseModal(handler) {
        // Close button
        this.closeBtn.addEventListener('click', handler);
        
        // Cancel button
        document.getElementById('cancel-add')?.addEventListener('click', handler);
        
        // Click outside modal
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                handler();
            }
        });
    }
}