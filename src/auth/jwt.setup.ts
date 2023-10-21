import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'secret';

export const createToken = (user: any) => {
    const token = jwt.sign({ sub: user._id }, secretKey, { expiresIn: '1h' });
    return token;
};

// Définition d'un type personnalisé pour context
type CustomContext = {
    request: any;
    user?: any; // Ajoutez la propriété user
};

// Middleware verifyToken
export const verifyToken = (context: CustomContext) => {
    const token = context.request.headers['Authorization'] || context.request.query.token;

    if (!token) {
        return {
            response: {
                status: 401,
                json: {
                    message: 'Token manquant',
                },
            },
        };
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        context.user = decoded;
        return { context };
    } catch (error) {
        return {
            response: {
                status: 401,
                json: {
                    message: 'Token invalide',
                },
            },
        };
    }
};

