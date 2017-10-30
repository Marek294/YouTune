import jwt from 'jsonwebtoken';

export const generateJWT = (user) => {
    return jwt.sign({
        email: user.get('email'),
        confirmed: user.get('confirmed'),
        librarian: user.get('librarian'),
        firstname: user.get('firstname'),
        lastname: user.get('lastname'),
        avatar: user.get('avatar')
    }, process.env.JWT_SECRET );
}

export const toAuthJSON = (user, token) => {
    return {
        email: user.get('email'),
        confirmed: user.get('confirmed'),
        librarian: user.get('librarian'),
        firstname: user.get('firstname'),
        lastname: user.get('lastname'),
        avatar: user.get('avatar'),
        token
    }
}

export const generateResetPasswordJWT = (user) => {
    return jwt.sign({
        email: user.get('email')
    }, process.env.JWT_SECRET,
    { expiresIn: "1h" } );
}