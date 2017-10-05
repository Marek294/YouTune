import jwt from 'jsonwebtoken';

export const generateJWT = (user) => {
    return jwt.sign({
        email: user.get('email'),
        confirmed: user.get('confirmed'),
        librarian: user.get('librarian')
    }, process.env.JWT_SECRET );
}

export const toAuthJSON = (user, token) => {
    return {
        email: user.get('email'),
        confirmed: user.get('confirmed'),
        librarian: user.get('librarian'),
        token
    }
}

export const generateResetPasswordJWT = (user) => {
    return jwt.sign({
        email: user.get('email')
    }, process.env.JWT_SECRET,
    { expiresIn: "1h" } );
}