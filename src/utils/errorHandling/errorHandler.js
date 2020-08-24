class TemplateError extends Error {
    constructor(name, message, errorType) {
        super(message);
        this.name = name;
        this.message = message;
        this.errorType = errorType;
    }
}


class PasswordInValid extends TemplateError {
    constructor(message) {
        super('PasswordInValid', message, 'custom');
    }
}

class AuthenticationError extends TemplateError {
    constructor(message) {
        super('AuthenticationError', message, 'custom');
    }
}

class OAuth2Err extends TemplateError {
    constructor(message) {
        super('OAuth2Error', message, 'custom');
    }
}


class DatabaseError extends TemplateError {
    constructor(message) {
        super('DatabaseError', message, 'custom');
    }
}

class GenericError extends TemplateError {
    constructor(message, name) {
        super(name, message, 'custom');
    }
}

module.exports = { PasswordInValid, GenericError, AuthenticationError, DatabaseError, OAuth2Err };