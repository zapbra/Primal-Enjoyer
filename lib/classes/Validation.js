const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export class Validation {
    static validateEmail(email) {
        return EMAIL_REGEX.test(email);
    }
}

